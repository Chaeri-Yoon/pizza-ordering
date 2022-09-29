import mongoose, { Document, Schema } from "mongoose";

export interface ICart extends Document {
    user: Schema.Types.ObjectId,
    menu: Schema.Types.ObjectId,
    toppings: Schema.Types.ObjectId[],
    quantity: number
}
const schema = new Schema<ICart>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    },
    toppings: {
        type: [Schema.Types.ObjectId],
        ref: 'Topping'
    },
    quantity: Number
});
const model = mongoose.models.Cart || mongoose.model<ICart>('Cart', schema);
export default model;