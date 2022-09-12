import { Fragment, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from "next/head";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import useApi, { IStateData } from '../lib/useApi';
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
const ErrorMessageText = styled.span`
    font-size: 12px;
`;
interface IForm {
    email: string,
    password: string,
}
interface IResponseData extends IStateData {
    message?: string
}
const Login: NextPage = () => {
    const router = useRouter();
    const [loginRequest, { loading: loginLoading, data: loginData }] = useApi<IResponseData>('/api/login');
    const { register, handleSubmit, formState: { isValid } } = useForm<IForm>({ mode: 'onChange' });
    const onSubmit = (data: IForm) => loginRequest(data);
    useEffect(() => {
        if (!loginData) return;
        if (loginData.ok) {
            const timer = setTimeout(() => router.push('/'), 3000);
            return () => clearTimeout(timer);
        }
    }, [loginLoading]);
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
                    {loginData?.message && <ErrorMessageText>{loginData?.message}</ErrorMessageText>}
                    <FormSubmitButton disabled={!isValid}>Sign In</FormSubmitButton>
                </Form>
            </LoginMain>
        </Fragment>
    )
};

export default Login;