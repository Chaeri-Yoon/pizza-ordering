import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const MONGODB_URL = process.env.MONGODB_URL || '';
export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        if ((mongoose.connection?.readyState !== 1) && (mongoose.connection?.readyState !== 2)) {
            mongoose.connect(MONGODB_URL);
            const db = mongoose.connection;
            const handleOpen = () => console.log("✔ Connected to DB");
            const handleError = () => console.log("❌ Error on DB Connection");

            db.once("open", handleOpen);
            db.on("error", handleError);
        }
        res.status(200).json({ message: "DB success!" });
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}