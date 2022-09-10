import { NextApiRequest, NextApiResponse } from "next";
import { decryptPassword } from "../../lib/password";
import User from '../../models/user';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { body: { email, password } } = req;
    try {
        const foundUser = await User.findOne({
            where: {
                email
            }
        });
        if (!foundUser) return res.status(404).json({ message: "User does not exist." });
        if (!decryptPassword(foundUser, password)) return res.status(401).json({ message: "Invalid password" });

        res.status(200).json({ message: "Login success!" });
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}
export default handler;