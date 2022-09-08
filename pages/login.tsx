import { Fragment } from 'react';
import type { NextPage } from 'next';
import Head from "next/head";
import styled from 'styled-components';
import { Main, Form } from '../components/StyleComponents';
import { useForm } from 'react-hook-form';

const LoginMain = styled(Main)`
    height: calc(100vh - 3em);
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #D3411F;
`;
const Login: NextPage = () => {
    const { register, handleSubmit } = useForm();
    return (
        <Fragment>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LoginMain>
                <Form>
                    <input {...register("email", { required: true })} type="email" placeholder="email" />
                    <input {...register("password", { required: true })} type="password" placeholder="password" />
                    <input type="submit" value='Sign In' />
                </Form>
            </LoginMain>
        </Fragment>
    )
};

export default Login;