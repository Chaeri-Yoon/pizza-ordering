import { NextApiRequest, NextApiResponse } from "next";
import User from '../../models/user';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { body: { email, nickname } } = req;
        await User.create({
            email,
            nickname
        });
        res.status(200).json({ message: "DB success!" });
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}
export default handler;