import { NextApiRequest, NextApiResponse } from "next";
import { encryptPassword } from "../../lib/loginPassword";
import User from '../../models/user';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { body: { email, nickname, password } } = req;
    const passwordInfo = encryptPassword(password);
    try {
        await User.create({
            email,
            nickname,
            hash: passwordInfo.hash,
            salt: passwordInfo.salt
        });
        res.status(200).json({ message: "DB success!" });
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}
export default handler;