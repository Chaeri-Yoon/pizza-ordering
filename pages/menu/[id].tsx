import Head from "next/head";
import React, { Fragment, useState } from "react";
import { Document } from "mongoose";
import { GetStaticProps, NextPage } from "next";
import serializeId from "../../lib/serializeId";
import dbConnect from "../../lib/dbConnect";
import useMutationApi, { IStateData } from "../../lib/useMutationApi";
import Menu, { IMenu } from '../../models/menu';
import Topping, { ITopping } from '../../models/topping';
import { Main, Container } from '../../components/styles/PageStyleComponents';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, library } from "@fortawesome/fontawesome-svg-core";
import { faPizzaSlice, fas } from '@fortawesome/free-solid-svg-icons';
import { ESizeOptions, TSize } from "../../models/cart";

library.add(fas);

const Title = styled.span`
    color: #aaa9a9;
    font-weight: 600;
`;
const MenuContainer = styled(Container)`
    height: calc(100vh - 3em);
    padding: 0 10em;
    flex-direction: row;
    justify-content: center;        
    gap: 3em;
    & > div{
        width: 30%;
        aspect-ratio: 3 / 4;
    }
`;
const MenuImageContainer = styled.div<{ backgroundUrl: string }>`
    background-color: #252525;
    background-image: url(${(props) => props.backgroundUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
`;
const MenuOrderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2em;
    & > div{
        width: 100%;
    }
`;
const MenuInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    & > span:first-child{
        margin-bottom: 0.5em;
        font-size: 1.5em;
    }
    & > span:last-child{
        color: #d8d6d6;
        font-style: italic;
    }
`;
const MenuSelectContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1em;
    & > div{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.5em;
    }
`;
const SelectionCategory = styled.div`
    width: 75%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 0.5em;
`;
const SelectionIcon = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
`;
const SelectionIconImage = styled.button<{ iconSize: TSize }>`
    width: ${(props) => {
        if (props.iconSize === ESizeOptions.S) return '50%';
        else if (props.iconSize === ESizeOptions.M) return '60%';
        else return '70%';
    }};
    aspect-ratio: 1 / 1;
`;
const ExtraCharge = styled.div`
    text-align: left;
    font-size: 0.7em;
`;
const TotalContainer = styled.div`
    padding: 0 1em;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    
    & > span:last-child{
        margin-left: 0.5em;
        font-size: 1.5em;
    }
`;
const AddToCartButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    & > button{
        width: 100%;
        border: 1px solid #aaa9a9;
        background-color: #aaa9a9;
        color: white;
    }
`;
// interface, type
interface ISelection {
    size: TSize,
    toppings: ITopping[],
    quantity: number
}

interface IAddToCartForm {
    menu: string,
    size: TSize,
    toppings: ITopping[]
}

const MenuDetailPage: NextPage<{ menu: IMenu, toppings: ITopping[] }> = ({ menu, toppings }) => {
    const [addToCart, { loading: addToCartLoading }] = useMutationApi<IStateData, IAddToCartForm>('/api/cart');
    const [selection, setSelection] = useState<ISelection>({
        size: ESizeOptions.S,
        toppings: [],
        quantity: 1
    });
    const totalPrice = menu.price
        + (selection.size === ESizeOptions.S ? 0 : (selection.size === ESizeOptions.M ? 2 : 4))
        + selection.toppings.reduce((acc, cur) => acc + (toppings.find(topping => topping.name === cur.name)?.price || 0), 0);

    const handleSizeClick = (size: TSize) => setSelection(prev => ({ ...prev, size }));
    const handleTopping = (topping: ITopping) => setSelection(prev => {
        const isExist = prev.toppings.includes(topping);
        const newToppings = isExist ? [...prev.toppings.filter(ing => ing !== topping)] : [...prev.toppings, topping];
        return { ...prev, toppings: [...newToppings] }
    })
    const SizeOption = ({ size }: { size: TSize }) => (
        <SelectionIcon>
            <SelectionIconImage iconSize={size} onClick={() => handleSizeClick(size)}>
                <FontAwesomeIcon icon={faPizzaSlice} color={selection.size === size ? 'yellow' : '#252525'} />
            </SelectionIconImage>
            {size !== 'S' && <ExtraCharge>+${size == ESizeOptions.M ? 2 : 4}</ExtraCharge>}
        </SelectionIcon>
    );
    const ToppingOption = ({ children, topping }: { children: React.ReactNode, topping: ITopping }) => (
        <SelectionIcon>
            <SelectionIconImage iconSize='S' onClick={() => handleTopping(topping)}>
                {children}
            </SelectionIconImage>
            <ExtraCharge>+${topping.price}</ExtraCharge>
        </SelectionIcon>
    )
    const handleAddToCart = () => {
        const data = {
            menu: menu._id,
            size: selection.size,
            toppings: selection.toppings.map(topping => toppings.find(db => db.name === topping.name)?._id)
        }
        addToCart(data);
    }
    return (
        <Fragment>
            <Head>
                <title>{`Menu | ${menu.name}`}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Main>
                <MenuContainer>
                    <MenuImageContainer backgroundUrl={menu.image || ''}>yeba</MenuImageContainer>
                    <MenuOrderContainer>
                        <MenuInfoContainer>
                            <Title>{menu.name}</Title>
                            <span>{menu.description}</span>
                        </MenuInfoContainer>
                        <MenuSelectContainer>
                            <div>
                                <Title>Choose the size</Title>
                                <SelectionCategory>
                                    <SizeOption size={ESizeOptions.S} />
                                    <SizeOption size={ESizeOptions.M} />
                                    <SizeOption size={ESizeOptions.L} />
                                </SelectionCategory>
                            </div>
                            <div>
                                <Title>Choose toppings</Title>
                                <SelectionCategory>
                                    {toppings?.map(topping => {
                                        return (<ToppingOption key={topping._id} topping={topping}>
                                            <FontAwesomeIcon icon={['fas', topping.icon as IconName]} color={selection.toppings.includes(topping) ? 'yellow' : '#252525'} />
                                        </ToppingOption>)
                                    })}
                                </SelectionCategory>
                            </div>
                        </MenuSelectContainer>
                        <TotalContainer>
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </TotalContainer>
                        <AddToCartButtonContainer><button onClick={handleAddToCart}>{addToCartLoading ? "Loading..." : "Add To Cart"}</button></AddToCartButtonContainer>
                    </MenuOrderContainer>
                </MenuContainer>
            </Main>
        </Fragment>
    )
}
export async function getStaticPaths() {
    await dbConnect();
    const data: Document[] = await Menu.find({}).select("_id");
    const menuList = serializeId(data);
    return {
        paths: menuList.map(menu => ({ params: { id: menu._id } })),
        fallback: false
    }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
    await dbConnect();
    const menuData: Document[] = await Menu.find({ _id: params?.id || '' })
    const menu = serializeId(menuData);
    const toppingsData: Document[] = await Topping.find({});
    const toppings = serializeId(toppingsData);
    return {
        props: {
            menu: menu[0],
            toppings
        }
    }
}
export default MenuDetailPage;