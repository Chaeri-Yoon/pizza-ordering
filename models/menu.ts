import mongoose, { Document } from "mongoose";

export interface IMenu extends Document {
    name: string,
    image: string,
    price: number,
    description: string
}
const schema = new mongoose.Schema<IMenu>({
    name: String,
    image: String,
    price: Number,
    description: String
});
const model = mongoose.models.Menu || mongoose.model<IMenu>('Menu', schema);
export default model;