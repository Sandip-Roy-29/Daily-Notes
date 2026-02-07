import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function EditProfile(){
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleEditProfile = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            await api.put(
                "/users/update-credentials",
                {
                    username: username.trim().toLocaleLowerCase(),
                    email: email.trim().toLocaleLowerCase()
                }
            )

            navigate("/profile");
        } catch (err) {
            setError(err.response?.data?.message || "Update failed");
        } finally{
            setLoading(false);
        }
    }

    return(
        <div>
            <h2>Edit Profile</h2>

            {error && <p style={{color:"red"}}>{error}</p>}

            <form onSubmit={handleEditProfile}>

            <div>
                <input 
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                 />
            </div>
            
            <div>
                <input 
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 />
            </div>

            <button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
            </form>
        </div>
    )
}

export default EditProfile;