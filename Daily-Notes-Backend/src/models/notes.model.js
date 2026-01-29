import mongoose, { Schema } from "mongoose";

const notesSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            default: "Untitle",
        },
        content:{
            type: String,
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required: true,
        }
    },
    {timestamps: true}
)

export const Note = mongoose.model("Note",notesSchema);