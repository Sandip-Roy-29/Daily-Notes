import { Note } from "../../../src/models/notes.model.js"

export const getNoteSetup = async (
    userId, 
    title="Default test title", 
    content="Default test content") => {
    const note = await Note.create({
        title,
        content: [{text: content}],
        owner: userId
    })

    return note;
}