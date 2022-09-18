import { Fragment } from 'react';
import type { NextPage } from 'next';
import Head from "next/head";
import { useForm } from 'react-hook-form';
import { ILoginInput } from './api/login';
import useLoginRequest from '../lib/useLoginRequest';
import { Main } from '../components/styles/StyleComponents';
import { Form, FormInputContainer, FormSubmitButton } from '../components/styles/FormStyleComponents';
import styled from 'styled-components';

const LoginMain = styled(Main)`
    height: calc(100vh - 3em);
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #D3411F;
`;
const LoginMessageText = styled.span`
    font-size: 12px;
`;
const Login: NextPage = () => {
    const { loginRequest, message: loginMessage } = useLoginRequest();
    const { register, handleSubmit, formState: { isValid } } = useForm<ILoginInput>({ mode: 'onChange' });
    const onSubmit = (data: ILoginInput) => loginRequest(data);
    return (
        <Fragment>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LoginMain>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormInputContainer>
                        <input {...register("email", { required: "Enter your email" })} type="email" placeholder="email" />
                    </FormInputContainer>
                    <FormInputContainer>
                        <input {...register("password", { required: "Enter your password" })} type="password" placeholder="password" />
                    </FormInputContainer>
                    {loginMessage && <LoginMessageText>{loginMessage}</LoginMessageText>}
                    <FormSubmitButton disabled={!isValid}>Sign In</FormSubmitButton>
                </Form>
            </LoginMain>
        </Fragment>
    )
};

export default Login;