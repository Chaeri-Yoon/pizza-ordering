import { NextApiRequest, NextApiResponse } from "next";
import { encryptPassword } from "../../lib/loginPassword";
import apiHandler, { IApiResponse } from "../../lib/apiHandler";
import User from '../../models/user';

export interface IJoinResponse extends IApiResponse {
    message?: string
}
async function handler(req: NextApiRequest, res: NextApiResponse<IJoinResponse>) {
    const { body: { email, nickname, password } } = req;
    const passwordInfo = encryptPassword(password);
    try {
        await User.create({
            email,
            nickname,
            hash: passwordInfo.hash,
            salt: passwordInfo.salt
        });
        return res.status(200).json({ ok: true, message: "✅Successfully joined" });
    }
    catch (error) {
        return res.status(500).json({ ok: false, error: error?.toString() || "❌Something went wrong!" });
    }
}
export default apiHandler(handler);