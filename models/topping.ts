import mongoose, { Document } from "mongoose";

export interface ITopping extends Document {
    name: string,
    price: number,
}
const schema = new mongoose.Schema<ITopping>({
    name: String,
    price: Number
});
const model = mongoose.models.Topping || mongoose.model<ITopping>('Topping', schema);
export default model;