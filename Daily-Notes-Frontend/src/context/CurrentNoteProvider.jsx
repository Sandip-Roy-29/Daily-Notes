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

        try {
            setError(null);
            setLoading(true);
            const res = await updateNoteTitle(noteId, { title });
            setCurrentNote(prev => (
                prev? {
                    ...prev,
                    title: res.data.data.title
                } : prev
            ))
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update title");
        } finally {
            setLoading(false);
        }
    }

    const deleteCurrentNote = async (noteId) => {
        try {
            setError(null);
            setLoading(true);
            await deleteNote(noteId);
            setCurrentNote(null);
        } catch (err) {
            setError(err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    const addNoteContent = async (noteId, text) => {
        try {
            setError(null);
            setLoading(true);
            const res = await addContents(noteId, { content: text});
            setCurrentNote(prev => (
                prev ? {
                    ...prev,
                    content: res.data.data.content
                } : prev
            ))
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add content");
        } finally {
            setLoading(false);
        }
    }
    
    const updateNoteContent = async (noteId, contentId, text) => {
        try {
            setError(null);
            setLoading(true);
            const res = await updateContents(noteId, contentId, { text});
            setCurrentNote(prev => (
                prev ? {
                    ...prev,
                    content: res.data.data.content
                } : prev
            ))
        } catch (err) {
            setError(err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }
    
    const removeNoteContent = async (noteId, contentId) => {
        try {
            setError(null);
            setLoading(true);
            const res = await deleteContents(noteId, contentId);
            setCurrentNote(prev => (
                prev ? {
                    ...prev,
                    content: res.data.data.content
                } : prev
            ))
        } catch (err) {
            setError(err.response?.data?.message || "Failed to remove content");
        } finally {
            setLoading(false);
        }
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
                deleteCurrentNote,
            }}>
                {children}
            </CurrentNoteContext.Provider>
    )
}