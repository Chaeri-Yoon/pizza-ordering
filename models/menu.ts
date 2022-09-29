import mongoose, { Document, Schema } from "mongoose";

export interface IMenu extends Document {
    name: string,
    image: string,
    price: number,
    description: string,
    carts: Schema.Types.ObjectId[]
}
const schema = new Schema<IMenu>({
    name: String,
    image: String,
    price: Number,
    description: String,
    carts: [{
        type: [Schema.Types.ObjectId],
        ref: 'Cart'
    }]
});
const model = mongoose.models.Menu || mongoose.model<IMenu>('Menu', schema);
export default model;