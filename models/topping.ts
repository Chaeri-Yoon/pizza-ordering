import mongoose, { Document, Schema } from "mongoose";

export interface ITopping extends Document {
    name: string,
    price: number,
    carts: Schema.Types.ObjectId[]
}
const schema = new mongoose.Schema<ITopping>({
    name: String,
    price: Number,
    carts: [{
        type: [Schema.Types.ObjectId],
        ref: 'Cart'
    }]
});
const model = mongoose.models.Topping || mongoose.model<ITopping>('Topping', schema);
export default model;