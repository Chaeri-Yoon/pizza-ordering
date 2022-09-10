import mongoose from "mongoose";

export interface IUser {
    email: string,
    nickname: string,
    hash: string,
    salt: string
}
const schema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});
const model = mongoose.models.User || mongoose.model<IUser>('User', schema);
export default model;