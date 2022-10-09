import { NextApiRequest, NextApiResponse } from "next";
import apiHandler, { IApiResponse } from "../../lib/apiHandler";
import withApiSessionHandler from "../../lib/withApiSessionHandler";
import User from '../../models/user';

export interface ILoginInput {
    email: string,
    password: string
}
export interface ILoginResponse extends IApiResponse {
    message?: string
    loggedUser?: ILoggedUser
}
export interface ILoggedUser {
    email: string,
    nickname: string
}
async function handler(req: NextApiRequest, res: NextApiResponse<ILoginResponse>) {
    if (!req.session.user) return res.status(200).json({ ok: true, message: 'No logged user' });
    else {
        try {
            const loggedUser = await User.findById(req.session.user.id);
            if (!loggedUser) return res.status(404).json({ ok: false, message: "❌No user is found" });
            return res.status(200).json({ ok: true, loggedUser: { email: loggedUser.email, nickname: loggedUser.nickname } });
        }
        catch (error) {
            return res.status(500).json({ ok: false, error: error?.toString() || "Something went wrong!" });
        }
    }
}
export default withApiSessionHandler(apiHandler(handler));