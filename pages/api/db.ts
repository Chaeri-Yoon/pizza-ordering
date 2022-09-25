import { NextApiRequest, NextApiResponse } from "next";
import apiHandler, { IApiResponse } from "../../lib/apiHandler";
import dbConnect from "../../lib/dbConnect";

async function handler(req: NextApiRequest, res: NextApiResponse<IApiResponse>) {
    try {
        await dbConnect();
        return res.status(200).json({ ok: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, error: error?.toString() || "❌Something went wrong!" });
    }
}
export default apiHandler(handler);