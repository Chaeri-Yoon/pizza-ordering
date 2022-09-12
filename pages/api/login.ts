import { NextApiRequest, NextApiResponse } from "next";
import apiHandler, { IApiResponse } from "../../lib/apiHandler";
import { decryptPassword } from "../../lib/loginPassword";

import User from '../../models/user';

interface IResponseData extends IApiResponse {
    message?: string
}
async function handler(req: NextApiRequest, res: NextApiResponse<IResponseData>) {
    const { body: { email, password } } = req;
    try {
        const foundUser = await User.findOne({
            where: {
                email
            }
        });
        if (!foundUser) return res.status(404).json({ ok: false, message: "❌Wrong email or password" });
        if (!decryptPassword(foundUser, password)) return res.status(401).json({ ok: false, message: "❌Wrong email or password" });

        return res.status(200).json({ ok: true, message: "✅Successfully logged in" });
    }
    catch (error) {
        return res.status(500).json({ ok: false, error: error?.toString() || "Something went wrong!" });
    }
}
export default apiHandler(handler);