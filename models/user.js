import mongoose from "mongoose";

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    }
});
const model = mongoose.models.User || mongoose.model('User', schema);
export default model;