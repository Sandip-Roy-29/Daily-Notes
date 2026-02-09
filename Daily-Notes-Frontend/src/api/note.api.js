import api from "./axios";

export const fetchNotes = (signal) => {
    return api.get("/notes", { signal });
}

export const getCurrentNote = (noteId, signal) => {
    return api.get(`/notes/${noteId}`,{ signal });
}

export const createNotes = (data) => {
    return api.post("/notes",data);
}

export const updateNoteTitle = (noteId, data) => {
    return api.put(`/notes/${noteId}/title`,data);
}

export const deleteNote = (noteId) => {
    return api.delete(`/notes/${noteId}`);
}

export const addContents = (noteId, data) => {
    return api.post(`/notes/${noteId}/contents`,data);
}

export const updateContents = (noteId, contentId, data) => {
    return api.put(`/notes/${noteId}/contents/${contentId}`,data);
}

export const deleteContent = (noteId, contentId) => {
    return api.delete(`/notes/${noteId}/contents/${contentId}`);
}