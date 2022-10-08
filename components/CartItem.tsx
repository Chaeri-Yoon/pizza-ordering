import styled from "styled-components";
import { useSWRConfig } from "swr";
import useMutationApi from "../lib/useMutationApi";
import { ICartItem, ICartResponse } from "../pages/api/cart";
const CartItem = styled.li`
    position: relative;
    width: 100%;
    list-style-type: none;
`;
const RemoveButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -3em;
`;
const Columns = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 33%);
    justify-items: center;
    justify-content: center;
`;
const Column = styled.div`
    width: 100%;
    & > div{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
const ImageContainer = styled.div<{ backgroundUrl: string }>`
    margin-right: 1em;
    width: 30%;
    aspect-ratio: 3 / 4;
    background-color: #252525;
    background-image: url(${(props) => props.backgroundUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
`;
const DescriptionDetailContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-weight: 600;
`;
const PizzaSize = styled.span`
    font-size: 0.5em;
`;
const PizzaToppings = styled.div`
    padding: 0;
    display: flex;
    font-size: 0.5em;
`;
const CustomizingDetail = styled.span`
    font-weight: 400;
    color: #aaa9a9;
`;
const Quantity = styled.div`
    gap: 0.5em;
`;
const QuantityButton = styled.button`
    padding: 0;
    width: 2em;
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #efeded;
    color: #252525;
    text-align: center;
`;
const Price = styled.span`
    font-size: 1.5em;
`;
export default ({ data, price }: { data: ICartItem, price: number }) => {
    const { mutate } = useSWRConfig();
    const [updateCart] = useMutationApi(`/api/cart/${data._id}`);
    const handleQuantity = (operation: "minus" | "plus") => {
        const quantity = data.quantity + ((operation === "minus" ? -1 : 1) * 1);
        mutate('/api/cart', (prev: ICartResponse) => {
            const cartList = prev.cartList as ICartItem[];
            const index = cartList?.findIndex(cart => cart._id == data._id);
            return { ...prev, cartList: [...cartList.slice(0, index), { ...cartList[index], quantity }, ...cartList.slice(index + 1)] };
        }, false);
        updateCart({ quantity }, 'PATCH');
    }
    return (
        <CartItem>
            <RemoveButton>❌</RemoveButton>
            <Columns>
                <Column>
                    <div>
                        <ImageContainer backgroundUrl={data.menu.image} />
                        <DescriptionDetailContainer>
                            <span>{data.menu.name}</span>
                            <div>
                                <PizzaSize>Size: <CustomizingDetail>{data.size}</CustomizingDetail></PizzaSize>
                                {data.toppings.length > 0 && (
                                    <PizzaToppings>Toppings:
                                        {data.toppings?.map(topping => <CustomizingDetail key={topping._id}>&nbsp;{topping.name}</CustomizingDetail>)}
                                    </PizzaToppings>
                                )}
                            </div>
                        </DescriptionDetailContainer>
                    </div>
                </Column>
                <Column>
                    <Quantity>
                        <QuantityButton onClick={() => handleQuantity("minus")} disabled={data.quantity === 1}>-</QuantityButton>
                        <span>{data.quantity}</span>
                        <QuantityButton onClick={() => handleQuantity("plus")}>+</QuantityButton>
                    </Quantity>
                </Column>
                <Column><div><Price>${price.toFixed(2)}</Price></div></Column>
            </Columns>
        </CartItem>
    )
}