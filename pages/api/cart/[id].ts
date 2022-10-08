import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "../../../lib/apiHandler";
import withApiSessionHandler from "../../../lib/withApiSessionHandler";
import Cart from "../../../models/cart";

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
}
export default withApiSessionHandler(apiHandler(handler));