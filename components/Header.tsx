import Link from 'next/link';
import styled from 'styled-components';
import useLoginStatus from '../lib/useLoginStatus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 2em;
    padding: 1.5em 3em;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #D3411F;
    color: white;
    z-index: 99;

    & > *{
        width: 33%;
        display: flex;
        justify-content: center;
        align-items: center;

        &:first-child{
            justify-content: flex-start;
        }
        &:last-child{
            justify-content: flex-end;
        }
    }
`;
const Logo = styled.div`
    & > *{
        width: 1.5em;
        aspect-ratio: 1 / 1;
    }
`;
const NavContainer = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    & > *{
        padding: 0 10%;
        &:not(:last-child){
            border-right: 2px solid white;
        }
    }
`;
const UserContainer = styled(NavContainer)`
    & > *{
        padding: 0 5%;
        &:not(:last-child){
            border-right: 2px solid white;
        }
    }
`;
const UserName = styled.span`
    font-weight: 400;
`;
export default () => {
    const { loggedUser } = useLoginStatus();
    return (
        <Container>
            <Link href="/">
                <a>
                    <Logo>
                        <FontAwesomeIcon icon={faPizzaSlice} />
                    </Logo>
                </a>
            </Link>
            <NavContainer>
                <Link href="/#home">Home</Link>
                <Link href="/#menu">Menu</Link>
                <Link href="/#contact">Contact</Link>
            </NavContainer>
            <UserContainer>
                {(loggedUser === undefined) ? (
                    <>
                        <Link href="/join">Join</Link>
                        <Link href="/login">Login</Link>
                    </>
                ) : (
                    <>
                        <UserName>Hello, {loggedUser.nickname}</UserName>
                    </>
                )}
            </UserContainer>
        </Container>
    )
}