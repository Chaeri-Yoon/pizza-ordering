import { Fragment, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from "next/head";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { IJoinResponse } from './api/join';
import useMutationApi from '../lib/useMutationApi';
import useLoginRequest from '../lib/useLoginRequest';
import { Main } from '../components/styles/StyleComponents';
import { Form, FormInputContainer, FormErrorMessageText, FormSubmitButton } from '../components/styles/FormStyleComponents';
import styled from 'styled-components';

const JoinMain = styled(Main)`
    height: calc(100vh - 3em);
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #D3411F;
`;
interface IJoinForm {
    email: string,
    nickname: string,
    password: string,
    password_confirm: string
}
const Join: NextPage = () => {
    const [joinRequest, { loading: joinLoading, data: joinData }] = useMutationApi<IJoinResponse, IJoinForm>('/api/join');
    const { loginRequest } = useLoginRequest();
    const { register, handleSubmit, watch, formState: { errors, isValid }, getValues, setError, clearErrors } = useForm<IJoinForm>({ mode: 'onChange' });
    const passwordValue = watch('password');
    const passwordConfirmValue = watch('password_confirm');
    const isMatchWithConfirm = (value: string) => {
        const isMatch = value === passwordConfirmValue;
        if (isMatch) errors?.password_confirm && clearErrors('password_confirm');
        else !errors?.password_confirm && setError('password_confirm', { message: 'Password does not match.' });
        return isMatch;
    }
    const isMatchWithPassword = (value: string) => (value === passwordValue) || 'Password does not match.';
    const onSubmit = (data: IJoinForm) => joinRequest(data);
    useEffect(() => {
        if (joinData && joinData.ok) {
            const [email, password] = getValues(["email", "password"]);
            loginRequest({ email, password });
        }
    }, [joinLoading]);
    return (
        <Fragment>
            <Head>
                <title>Join</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <JoinMain>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Fragment>
                        <FormInputContainer>
                            <input {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                    message: "Enter a valid email address."
                                }
                            })} type="email" placeholder="email" />
                            {errors?.email && <ErrorMessage errors={errors} name="email" as={<FormErrorMessageText />} />}
                        </FormInputContainer>
                        <FormInputContainer>
                            <input {...register("nickname", { required: true })} type="text" placeholder="nickname" />
                            {errors?.nickname && <ErrorMessage errors={errors} name="nickname" as={<FormErrorMessageText />} />}
                        </FormInputContainer>
                        <FormInputContainer>
                            <input {...register("password", {
                                required: true,
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])./g,
                                    message: "Password should contain at least 1 uppercase, 1 lowercase, 1 number."
                                },
                                minLength: {
                                    value: 8,
                                    message: "Password should be longer than 8."
                                },
                                validate: isMatchWithConfirm
                            })} type="password" placeholder="password" />
                            {errors?.password && <ErrorMessage errors={errors} name="password" as={<FormErrorMessageText />} />}
                        </FormInputContainer>
                        <FormInputContainer>
                            <input {...register("password_confirm", { required: true, validate: isMatchWithPassword })} type="password" placeholder="password confirm" />
                            {errors?.password_confirm && <ErrorMessage errors={errors} name="password_confirm" as={<FormErrorMessageText />} />}
                        </FormInputContainer>
                        <FormSubmitButton disabled={!isValid}>Sign Up</FormSubmitButton>
                    </Fragment>
                </Form>
            </JoinMain>
        </Fragment>
    )
};
export default Join;