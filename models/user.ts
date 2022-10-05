import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    email: string,
    nickname: string,
    hash: string,
    salt: string,
    carts: Schema.Types.ObjectId[]
}
const schema = new Schema<IUser>({
    email: String,
    nickname: String,
    hash: String,
    salt: String,
    carts: [{
        type: [Schema.Types.ObjectId],
        ref: 'Cart'
    }]
});
const model = mongoose.models?.User || mongoose.model<IUser>('User', schema);
export default model;