import styled from 'styled-components';

export const Form = styled.form`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6em;
    & > *{
        width: 100%;
    }
`;
export const FormInputContainer = styled.p`
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.1em;
    & > *{
        width: 100%;
    }
    & > input{
        padding: 0.5em 1em;
        border: none;
        border-radius: 0.2em;
        color: #a89d9a;
        &:focus{
            outline: none;
        }
        &::placeholder{
            color: #efeded;
        }
    }
`;
export const FormErrorMessageText = styled.span`
    font-size: 10px;
`;