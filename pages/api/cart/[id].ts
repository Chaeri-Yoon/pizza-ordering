import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "../../../lib/apiHandler";
import withApiSessionHandler from "../../../lib/withApiSessionHandler";
import Cart, { ICart } from "../../../models/cart";
import User from "../../../models/user";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session.user) return res.status(200).json({ ok: true, message: 'No logged user' });
    if (req.method === 'PATCH') {
        const { query: { id }, body: data } = req;
        try {
            await Cart.findByIdAndUpdate(id, { ...data });
            return res.status(200).json({ ok: true });
        }
        catch (error) {
            return res.status(500).json({ ok: false, error: error?.toString() || "❌Something went wrong!" });
        }
    }
    else if (req.method === 'DELETE') {
        const { query: { id } } = req;
        try {
            const user = await User.findById(req.session.user.id);
            const newUserCarts = user.carts.filter((cart: ICart) => cart._id !== id);
            user.carts = newUserCarts;
            user.save();

            await Cart.findByIdAndDelete(id);
            return res.status(200).json({ ok: true });
        }
        catch (error) {
            return res.status(500).json({ ok: false, error: error?.toString() || "❌Something went wrong!" });
        }
    }
}
export default withApiSessionHandler(apiHandler(handler));