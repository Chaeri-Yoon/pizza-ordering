import useSWR from "swr";
import { IApiResponse } from "./apiHandler";
import { ILoggedUser } from "../pages/api/login";

interface ILoggedUserResponse extends IApiResponse {
    loggedUser: ILoggedUser
}
export default () => {
    const { data } = useSWR<ILoggedUserResponse>('/api/login');
    return { loggedUser: data && data.ok && data.loggedUser || undefined };
}