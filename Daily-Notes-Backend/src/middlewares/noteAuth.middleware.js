import { Note } from "../models/notes.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyNoteOwner = asyncHandler(async (req, _, next) => {

    // Take noteId from parameter
    const { noteId } = req.params;

    if(!noteId) throw new ApiError(400,"Node id is required");

    // Note exist or not
    const note = await Note.findById(noteId);

    if(!note) throw new ApiError(404,"Note does not exist");

    // Check note belongs to the user or not
    if(!note.owner.equals(req.user._id)) throw new ApiError(403,"You are not allowed to modify this note");

    // Attach note to the req
    req.note = note;

    // Move next
    next();
})