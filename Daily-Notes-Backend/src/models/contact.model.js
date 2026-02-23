import mongoose, { Schema } from 'mongoose';

const contactSchema = new mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type:{
        type: String,
        enum: ["support", "feedback", "bug"],
        default: "support",
    },
    email:{
        type: String,
        required: true,
    },
    subject:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    }
},{timestamps: true})

export const Contact = mongoose.model("Contact", contactSchema);