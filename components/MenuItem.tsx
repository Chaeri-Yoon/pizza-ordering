import Link from "next/link";
import styled from 'styled-components';
import { IBriefMenu } from "../pages";

const Container = styled.div<{ backgroundUrl: string }>`
    width: 100%;
    aspect-ratio: 3 / 4;
    background-color: black;
    background-image: url(${(props) => props.backgroundUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    &:hover{
        cursor: pointer;
        opacity: 0.5;
    }
`;
export default ({ menu }: { menu: IBriefMenu }) => {
    return (
        <Link href={`/${menu._id}`}><Container key={menu._id} backgroundUrl={menu.image || ''} /></Link>
    )
}