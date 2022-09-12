import { NextApiRequest, NextApiResponse } from "next";
import { encryptPassword } from "../../lib/loginPassword";
import apiHandler, { IApiResponse } from "../../lib/apiHandler";
import User from '../../models/user';

async function handler(req: NextApiRequest, res: NextApiResponse<IApiResponse>) {
    const { body: { email, nickname, password } } = req;
    const passwordInfo = encryptPassword(password);
    try {
        await User.create({
            email,
            nickname,
            hash: passwordInfo.hash,
            salt: passwordInfo.salt
        });
        res.status(200).json({ ok: true });
    }
    catch (error) {
        return res.status(500).json({ ok: false, error: error?.toString() || "❌Something went wrong!" });
    }
}
export default apiHandler(handler);