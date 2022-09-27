import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useLoginStatus from "../lib/useLoginStatus";

const Cart: NextPage = () => {
    const router = useRouter();
    const data = useLoginStatus();
    useEffect(() => {
        if (data && data.ok) data.loggedUser === undefined && router.push('/');
    }, [data, router]);
    return (
        <span>{data?.loggedUser?.nickname}</span>
    )
}
export default Cart;