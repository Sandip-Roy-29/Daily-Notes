import { useState, useCallback } from "react";
import { CurrentNoteContext } from "./CurrentNoteContext";
import {
    getCurrentNote,
    updateContents,
    updateNoteTitle,
    addContents,
    deleteContents,
    deleteNote
} from "../api/note.api";

export const CurrentNoteProvider = ({children}) => {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [currentNote,setCurrentNote] = useState(null);

    const fetchCurrentNote = useCallback(async (noteId, signal) => {
        try {
            setLoading(true);
            setError(null);

            const res = await getCurrentNote(noteId, signal);
            setCurrentNote(res.data.data);    
        } catch (err) {
            if(err.name !== "CanceledError"){
                setError("Failed to load note");
            }
        } finally{
            setLoading(false);
        }

    },[]);

    const updateTitle = async(noteId, title) => {
        const res = await updateNoteTitle(noteId, { title });
        setCurrentNote(prev => (
            {
                ...prev,
                title: res.data.data.title
            }
        ))
    }

    const deleteCurrentNote = async (noteId) => {
        await deleteNote(noteId);
        setCurrentNote(null);
    }

    const addNoteContent = async (noteId, text) => {
        const res = await addContents(noteId, { content: text});
        setCurrentNote(prev => (
            {
                ...prev,
                content: res.data.data.content
            }
        ))
    }
    
    const updateNoteContent = async (noteId, contentId, text) => {
        const res = await updateContents(noteId, contentId, { text});
        setCurrentNote(prev => (
            {
                ...prev,
                content: res.data.data.content
            }
        ))
    }
    
    const removeNoteContent = async (noteId, contentId) => {
        const res = await deleteContents(noteId, contentId);
        setCurrentNote(prev => (
            {
                ...prev,
                content: res.data.data.content
            }
        ))
    }

    const removeNote = async (noteId) => {
        await deleteNote(noteId);
        setCurrentNote(null);
    }

    return(
        <CurrentNoteContext.Provider
            value={{
                currentNote,
                loading,
                error,
                fetchCurrentNote,
                updateTitle,
                addNoteContent,
                updateNoteContent,
                removeNoteContent,
                removeNote,
                deleteCurrentNote,
            }}>
                {children}
            </CurrentNoteContext.Provider>
    )
}