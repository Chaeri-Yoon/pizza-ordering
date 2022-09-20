import mongoose from "mongoose";

export interface IUser {
    email: string,
    nickname: string,
    hash: string,
    salt: string
}
const schema = new mongoose.Schema<IUser>({
    email: String,
    nickname: String,
    hash: String,
    salt: String
});
const model = mongoose.models.User || mongoose.model<IUser>('User', schema);
export default model;