import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import apiHandler, { IApiResponse } from "../../lib/apiHandler";

const MONGODB_URL = process.env.MONGODB_URL || '';
async function handler(req: NextApiRequest, res: NextApiResponse<IApiResponse>) {
    try {
        if ((mongoose.connection?.readyState !== 1) && (mongoose.connection?.readyState !== 2)) {
            mongoose.connect(MONGODB_URL);
            const db = mongoose.connection;
            const handleOpen = () => console.log("✔ Connected to DB");
            const handleError = () => console.log("❌ Error on DB Connection");

            db.once("open", handleOpen);
            db.on("error", handleError);
        }
        return res.status(200).json({ ok: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, error: error?.toString() || "❌Something went wrong!" });
    }
}
export default apiHandler(handler);