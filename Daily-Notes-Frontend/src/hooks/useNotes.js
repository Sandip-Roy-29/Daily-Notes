import { useEffect, useState } from "react"
import { fetchNotes } from "../api/note.api";

export const useNotes = () => {
    const [notes,setNotes] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const loadNotes = async () => {
            try {
                const res = await fetchNotes(controller.signal);
                setNotes(res.data.data);
                
            } catch (err) {
                if(err.name !== "CanceledError") 
                    setError("Failed to fetch notes");
            } finally {
                setLoading(false);
            }
        }

        loadNotes();

        return () => controller.abort();
    },[])

    return { notes, loading, error};
}

