import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function Note(){
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        api.get("/notes")
            .then((res) => {
                console.log("Notes response",res.data);
                setLoading(false);
            })
            .catch((err) => {
                if(err.response?.status === 401) navigate("/login");
            })
    },[navigate])

    if(loading) return <p>Loading...</p>

    return(
        <div>
            <LogoutButton/>
            <h1>Notes page</h1>            
        </div>
    )
}

export default Note;