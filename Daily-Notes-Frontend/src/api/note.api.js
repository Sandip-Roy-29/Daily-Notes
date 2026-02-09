import api from "./axios";

export const fetchNotes = (signal) => {
    return api.get("/notes", { signal });
}

export const createNotes = (data) => {
    return api.post("/notes",data);
}