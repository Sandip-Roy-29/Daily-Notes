import mongoose, { Schema } from "mongoose";

const contentSchema = new mongoose.Schema(
    {
        text:{
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

const notesSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            default: "Untitle",
        },
        content:[
            contentSchema
        ],
        owner:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required: true,
        }
    },
    {timestamps: true}
)

export const Note = mongoose.model("Note",notesSchema);