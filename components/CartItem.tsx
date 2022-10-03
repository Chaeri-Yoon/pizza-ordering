import styled from "styled-components";
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
const PizzaToppings = styled.ul`
    padding: 0;
    display: flex;
    font-size: 0.5em;
`;
const PizzaTopping = styled.li`
    list-style-type: none;
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
export default () => {
    return (
        <CartItem>
            <RemoveButton>❌</RemoveButton>
            <Columns>
                <Column>
                    <div>
                        <ImageContainer backgroundUrl="https://i.ibb.co/TWYH4qD/photo-1604917877934-07d8d248d396-removebg-preview-1.png" />
                        <DescriptionDetailContainer>
                            <span>페퍼로니 피자</span>
                            <div>
                                <PizzaSize>Size: </PizzaSize>
                                <PizzaToppings>Toppings:
                                    <PizzaTopping>&nbsp;Topping</PizzaTopping>
                                    <PizzaTopping>&nbsp;Topping</PizzaTopping>
                                    <PizzaTopping>&nbsp;Topping</PizzaTopping>
                                </PizzaToppings>
                            </div>
                        </DescriptionDetailContainer>
                    </div>
                </Column>
                <Column>
                    <Quantity>
                        <QuantityButton>-</QuantityButton>
                        <span>1</span>
                        <QuantityButton>+</QuantityButton>
                    </Quantity>
                </Column>
                <Column><div><Price>$2.99</Price></div></Column>
            </Columns>
        </CartItem>
    )
}