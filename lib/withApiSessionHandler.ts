import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { IApiResponse } from './apiHandler';

declare module 'iron-session' {
    interface IronSessionData {
        user?: {
            id: string
        }
    }
}
const cookieOptions = {
    cookieName: "loginsession",
    password: process.env.COOKIE_PASSWORD!
}
export default function (handler: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => void) {
    return withIronSessionApiRoute(handler, cookieOptions);
}