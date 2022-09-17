import { NextApiRequest, NextApiResponse } from "next";
import apiHandler, { IApiResponse } from "../../lib/apiHandler";
import { decryptPassword } from "../../lib/loginPassword";
import withApiSessionHandler from "../../lib/withApiSessionHandler";

import User from '../../models/user';

export interface ILoginResponseData extends IApiResponse {
    message?: string
    loggedUser?: ILoggedUser
}
export interface ILoggedUser {
    email: string,
    nickname: string
}
async function handler(req: NextApiRequest, res: NextApiResponse<ILoginResponseData>) {
    if (req.method === 'POST') {
        const { body: { email, password } } = req;
        try {
            const foundUser = await User.findOne({
                where: {
                    email
                }
            });
            if (!foundUser) return res.status(404).json({ ok: false, message: "❌Wrong email or password" });
            if (!decryptPassword(foundUser, password)) return res.status(401).json({ ok: false, message: "❌Wrong email or password" });

            req.session.user = {
                id: foundUser._id
            }
            await req.session.save();
            return res.status(200).json({ ok: true, message: "✅Successfully logged in", loggedUser: { email: foundUser.email, nickname: foundUser.nickname } });
        }
        catch (error) {
            return res.status(500).json({ ok: false, error: error?.toString() || "Something went wrong!" });
        }
    }
    else if (req.method === 'GET') {
        if (!req.session.user) return res.status(404).json({ ok: false, message: 'No logged user' });
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
}
export default withApiSessionHandler(apiHandler(handler));