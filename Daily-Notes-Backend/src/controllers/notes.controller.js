import { Note } from "../models/notes.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// POST    /notes - Done
// PUT     /notes/:noteId/title - Done
// DELETE  /notes/:noteId

// POST    /notes/:noteId/contents
// PUT     /notes/:noteId/contents/:contentId
// DELETE  /notes/:noteId/contents/:contentId

const createNotes = asyncHandler(async (req, res) => {

    // Take information
    const { title, content } = req.body;

    // Validation
    if(!content ) throw new ApiError(400,"Content is mandatory");
    
    // Content normalization
    const contents = Array.isArray(content) 
        ? content
            .map(text => text.trim())
            .filter(Boolean)
            .map(text => ({text}))
        : content.trim() ? [{text: content.trim()}] : [] ;

    if( contents.length === 0) throw new ApiError(400,"Content can not be empty");

    // Note creation
    const note = await Note.create(
        {
            title: title?.trim() || undefined,
            content: contents,
            owner: req.user._id
        }
    )

    // Create a response and send
    return res
    .status(201)
    .json(
        new ApiResponse(201,note,"Note created successfully")
    )
})

const updateNoteTitle = asyncHandler(async (req, res) => {

    // Take information
    const { title } = req.body;

    // Validation
    if(title.trim() === "" || !title) throw new ApiError(400,"Title is required");

    if(req.note.title === title) throw new ApiError(400,"Title is unchanged");

    // Set and save the new title
    req.note.title = title.trim();
    await req.note.save();
    
    // Create a response and send it
    return res
    .status(200)
    .json(
        new ApiResponse(200,req.note,"Title updated successfully")
    )
})

const deleteNotes = asyncHandler(async (req, res) => {
    await req.note.deleteOne();

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"Note deleted successfully")
    )
})

export {
    createNotes,
    updateNoteTitle,
    deleteNotes
}