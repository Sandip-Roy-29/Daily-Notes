import api from "./axios";

export const fetchNotes = async (signal) => {
    return await api.get("/notes", { signal });
}

export const getCurrentNote = async (noteId, signal) => {
    return await api.get(`/notes/${noteId}`,{ signal });
}

export const createNotes = async (data) => {
    return await api.post("/notes",data);
}

export const updateNoteTitle = async (noteId, data) => {
    return await api.put(`/notes/${noteId}/title`,data);
}

export const deleteNote = async (noteId) => {
    return await api.delete(`/notes/${noteId}`);
}

export const fetchAllCurrentNoteContents = async (noteId) => {
    return await api.get(`/notes/${noteId}/contents`);
}

export const addContents = async (noteId, data) => {
    return await api.post(`/notes/${noteId}/contents`,data);
}

export const updateContents = async (noteId, contentId, data) => {
    return await api.put(`/notes/${noteId}/contents/${contentId}`,data);
}

export const deleteContents = async (noteId, contentId) => {
    return await api.delete(`/notes/${noteId}/contents/${contentId}`);
}