import { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useLoginStatus from "../lib/useLoginStatus";
import { Main, Container } from "../components/styles/PageStyleComponents";
import CartItem from "../components/CartItem";
import styled from "styled-components";
import useSWR from "swr";
import { ICartResponse } from "./api/cart";
import { ESizeOptions } from "../models/cart";

const PageContainer = styled(Container)`
    height: calc(100vh - 3em);
    padding: 3em 10em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5em;
    & > div{
        width: 70%;
    }
`;
const Title = styled.span`
    color: #252525;
    font-weight: 600;
    font-size: 2em;
    margin-bottom: 0.5em;
`;
const CartContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #252525;
`;
const CartInfoTitleContainer = styled.div`
    padding: 1em 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 33%);
    justify-items: center;
    justify-content: center;
    border-bottom: 1px solid #252525;
`;
const CartList = styled.ul`
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 2em;
`;
const PriceContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 33%);
    direction: rtl;
    justify-items: center;
    justify-content: center;
    font-size: 1.5em;
    text-align: center;
    & > *{
        width: 100%;
    }
`;
const Cart: NextPage = () => {
    const router = useRouter();
    const data = useLoginStatus();
    const { data: cartData } = useSWR<ICartResponse>('/api/cart');
    const [totalPrice, setTotalPrice] = useState(0.0);
    const [cartList, setCartList] = useState<JSX.Element[]>();
    useEffect(() => {
        if (data && data.ok) data.loggedUser === undefined && router.push('/');
    }, [data, router]);
    useEffect(() => {
        setTotalPrice(0.0);
        cartData?.cartList && setCartList(cartData.cartList?.map(cartItem => {
            // The data on additional price according to the size will be migrated to DB
            const price = cartItem.quantity * (cartItem.menu.price + (cartItem.size === ESizeOptions.M ? 2 : (cartItem.size === ESizeOptions.L ? 4 : 0)) + cartItem.toppings?.reduce((acc, cur) => acc + cur.price, 0))
            setTotalPrice(prev => prev + price);
            return <CartItem key={cartItem._id} data={cartItem} price={price} />
        }))
    }, [cartData])
    return (
        <Fragment>
            <Head>
                <title>Cart</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Main>
                <PageContainer>
                    <Title>My Shopping Cart</Title>
                    <CartContainer>
                        <CartInfoTitleContainer>
                            <span>Description</span>
                            <span>Quantity</span>
                            <span>Price</span>
                        </CartInfoTitleContainer>
                        <CartList>
                            {cartList?.map(cart => cart)}
                        </CartList>
                    </CartContainer>
                    <PriceContainer>
                        <span>${totalPrice.toFixed(2)}</span>
                    </PriceContainer>
                </PageContainer>
            </Main>
        </Fragment>
    )
}
export default Cart;