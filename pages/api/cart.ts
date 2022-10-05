import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import apiHandler, { IApiResponse } from "../../lib/apiHandler";
import withApiSessionHandler from "../../lib/withApiSessionHandler";
import User, { IUser } from '../../models/user';
import Cart, { ICart } from "../../models/cart";
import { IMenu } from "../../models/menu";
import { ITopping } from "../../models/topping";

export interface ICartResponse extends IApiResponse {
    message?: string
    cartList?: ICartItem[]
}
export interface ICartItem extends Omit<ICart, 'user' | 'menu' | 'toppings'> {
    user: IUser,
    menu: IMenu,
    toppings: ITopping[]
}
async function handler(req: NextApiRequest, res: NextApiResponse<ICartResponse>) {
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
                    size: data.size,
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
    else if (req.method === 'GET') {
        const userId = req.session.user.id;
        try {
            const cartList: ICartItem[] = await Cart.find({ user: userId }).populate('menu').populate('toppings');
            return res.status(200).json({ ok: true, cartList });
        }
        catch (error) {
            return res.status(500).json({ ok: false, error: error?.toString() || "❌Something went wrong!" });
        }
    }
}
export default withApiSessionHandler(apiHandler(handler));