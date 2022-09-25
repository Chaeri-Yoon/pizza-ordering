import { Document } from "mongoose";

interface IObject extends Document {
    _id: string
}
export default function (documentData: Document[]) {
    return documentData.map(document => {
        let object: IObject = document.toObject();
        object._id = object._id.toString();
        return object;
    });
}