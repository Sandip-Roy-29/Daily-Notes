import { useContext } from "react"
import { CurrentNoteContext } from "../context/CurrentNoteContext"

export const useCurrentNote = () => {
    const context = useContext(CurrentNoteContext);

    if(!context){
        throw new Error(
            "useCurrentNote must be used within a CurrentNoteProvider"
        )
    }

    return context;
}