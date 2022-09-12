import { NextApiRequest, NextApiResponse } from "next";

export type IApiResponse = {
    ok: boolean,
    error?: string
}
export default function (handler: (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => void) {
    return async function (req: NextApiRequest, res: NextApiResponse): Promise<any> {
        await handler(req, res);
    }
}