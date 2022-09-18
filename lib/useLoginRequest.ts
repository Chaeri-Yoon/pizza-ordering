import { useEffect } from "react";
import { useSWRConfig } from "swr";
import { useRouter } from 'next/router';
import useMutationApi from "./useMutationApi";
import { ILoginInput, ILoginResponse } from "../pages/api/login";

export default () => {
    const router = useRouter();
    const { mutate } = useSWRConfig();
    const [loginRequest, { loading, data }] = useMutationApi<ILoginResponse, ILoginInput>('/api/login');
    useEffect(() => {
        if (!data) return;
        if (data.ok) {
            const timer = setTimeout(() => {
                mutate('/api/login', (prev: ILoginResponse) => ({ ...prev, loggedUser: data.loggedUser }));
                router.push('/');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [loading]);
    return { loginRequest, message: data.message };
}