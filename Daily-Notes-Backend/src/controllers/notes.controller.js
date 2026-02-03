import { Note } from "../models/notes.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// POST    /notes - Done
// PUT     /notes/:noteId/title - Done
// DELETE  /notes/:noteId - Done
// GET     /notes - Done

// POST    /notes/:noteId/contents - Done
// PUT     /notes/:noteId/contents/:contentId - Done
// DELETE  /notes/:noteId/contents/:contentId - Done
// GET     /notes/:noteId/contents - Done

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

const getCurrentNote = asyncHandler(async (req, res) => {

    const notes = await Note.find({owner: req.user._id}).sort({updatedAt: -1});

    return res
    .status(200)
    .json(
        new ApiResponse(200,notes,"Current note fetched successfully")
    )
})

const addContents = asyncHandler(async (req, res) => {

    // Take content
    const { content } = req.body;

    if(!content) throw new ApiError(400,"Content is required");

    // Normalize input
    const contents = Array.isArray(content)
        ? content
            .map(text => text.trim())
            .filter(Boolean)
            .map(text => ({text}))
        : content.trim() ? [{text: content.trim()}] : []

    if(!contents.length) throw new ApiError(400,"Content cannot be empty");

    // Append content & save
    req.note.content.push(...contents);
    await req.note.save();

    // Create & return a response
    return res
    .status(200)
    .json(
        new ApiResponse(200,req.note,"Content created successfully")
    )
})

const updateContent = asyncHandler(async (req, res) => {

    // Take imformation
    const { text } = req.body;

    if(!text || text.trim() === "") throw new ApiError(400,"Updated text is required");

    // Set & save
    req.content.text = text.trim();
    await req.note.save();

    // Creat & send a response
    return res
    .status(200)
    .json(
        new ApiResponse(200,req.content,"Content updated successfully")
    )
})

const getCurrentNoteContents = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(200,req.note.content,"All contents fetched successfully")
    )
})

const deleteContent = asyncHandler(async (req, res) => {

    // Delete the content from the array
    req.note.content.pull(req.content._id);

    //Save document
    await req.note.save();

    // Create & send a response
    return res
    .status(200)
    .json(
        new ApiResponse(200,null,"Content deleted successfully")
    )
})

export {
    createNotes,
    updateNoteTitle,
    deleteNotes,
    getCurrentNote,
    addContents,
    updateContent,
    getCurrentNoteContents,
    deleteContent
}