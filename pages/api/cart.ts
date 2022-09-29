import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "../../lib/apiHandler";
import withApiSessionHandler from "../../lib/withApiSessionHandler";
import User from '../../models/user';
import Cart from "../../models/cart";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session.user) return res.status(200).json({ ok: true, message: 'No logged user' });
    if (req.method === 'POST') {
        const { body: data } = req;
        const userId = req.session.user.id;
        const cartData = { ...data, user: userId, menu: new mongoose.Types.ObjectId(data.menu), toppings: data.toppings.map((topping: string) => new mongoose.Types.ObjectId(topping)) }
        try {
            // Check if the same order already exists
            const existingCart = await Cart.findOne({ ...cartData });
            if (existingCart) {
                existingCart.quantity += 1;
                existingCart.save();
            }
            else {
                const cart = await Cart.create({
                    ...cartData,
                    quantity: 1
                });
                const user = await User.findById(userId);
                user.carts.push(cart);
                user.save();
            }
            return res.status(200).json({ ok: true });
        }
        catch (error) {
            return res.status(500).json({ ok: false, error: error?.toString() || "❌Something went wrong!" });
        }
    }
}
export default withApiSessionHandler(apiHandler(handler));