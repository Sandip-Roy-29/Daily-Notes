import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Profile(){
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");
    const [user,setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleProfile = async () => {
            try {
                const res = await api.get("/users/current-user");
                setUser(res.data.data);
            } catch (err) {
                setError(err.response?.data?.message);
            } finally{
                setLoading(false);
            }
        }

        handleProfile();
    },[])

    if(loading) return <p>Loading Profile...</p>
    if(error) return <p style={{color: "red" }}>{error}</p>
    if(!user) return <p>No user</p>;

    return(
        <div>
            <h2>Profile</h2>
            <p>username:{user.username}</p>
            <p>email:{user.email}</p>
            <button onClick={() => navigate("/edit-profile")}>Edit</button>
        </div>
    )
}

export default Profile;