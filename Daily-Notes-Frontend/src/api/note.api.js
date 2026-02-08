import api from "./axios";

export const fetchNotes = (signal) => {
    return api.get("/notes", { signal });
}