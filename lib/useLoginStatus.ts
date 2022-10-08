import useSWR from "swr";
import { IApiResponse } from "./apiHandler";
import { ILoggedUser } from "../pages/api/user";

interface ILoggedUserResponse extends IApiResponse {
    loggedUser: ILoggedUser
}
export default () => {
    const { data } = useSWR<ILoggedUserResponse>('/api/user');
    // return { loggedUser: (data && data.ok && data.loggedUser) || undefined };
    return data;
}