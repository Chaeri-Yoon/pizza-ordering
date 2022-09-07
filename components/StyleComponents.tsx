import styled from 'styled-components';

export const Main = styled.main`
    position: absolute;
    top: 3em;
    width: 100%;
`;
export const Form = styled.form`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6em;
    & > input{
        padding: 0.5em 1em;
        width: 100%;
        border: none;
        border-radius: 0.2em;
        color: #a89d9a;
        &:focus{
            outline: none;
        }
        &::placeholder{
            color: #d3c2be;
        }
    }
`;