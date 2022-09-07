import { Fragment } from 'react';
import type { NextPage } from 'next';
import Head from "next/head";
import styled from 'styled-components';
import { Main, Form } from '../components/StyleComponents';
import { useForm } from 'react-hook-form';

const JoinMain = styled(Main)`
    height: calc(100vh - 3em);
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #D3411F;
`;
const Join: NextPage = () => {
    const { register, handleSubmit } = useForm();
    return (
        <Fragment>
            <Head>
                <title>Join</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <JoinMain>
                <Form>
                    <input {...register("email", { required: true })} type="email" placeholder="email" />
                    <input {...register("password", { required: true })} type="password" placeholder="password" />
                    <input {...register("password_confirm", { required: true })} type="password" placeholder="password confirm" />
                    <input type="submit" value='submit' />
                </Form>
            </JoinMain>
        </Fragment>
    )
};

export default Join;