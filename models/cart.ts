import mongoose, { Document, Schema } from "mongoose";

export enum ESizeOptions { 'S' = 'S', 'M' = 'M', 'L' = 'L' };
export type TSize = keyof typeof ESizeOptions;
export interface ICart extends Document {
    user: Schema.Types.ObjectId,
    menu: Schema.Types.ObjectId,
    size: ESizeOptions,
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
    size: String,
    toppings: {
        type: [Schema.Types.ObjectId],
        ref: 'Topping'
    },
    quantity: Number
});
const model = mongoose.models?.Cart || mongoose.model<ICart>('Cart', schema);
export default model;