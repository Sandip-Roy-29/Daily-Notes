import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

function EditProfileForm(){
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [success, setSuccess] = useState(null);
    const { UpdateInfo } = useAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!username.trim()){
            setError("Username is required");
            return;
        }

        try {
            setError(null);
            setSuccess(null);
            setLoading(true);
            const res = await UpdateInfo(username);
            if(res) setSuccess("Username updated successfully");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to change username");
        } finally {
            setLoading(false);
        }
        
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input 
                type="text"
                placeholder="Enter new username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update"}
            </button>
            </form>

            {error && <p style={{color:"red"}}>{error}</p>}
            {success && <p style={{color:"green"}}>{success}</p>}
        </div>
    )
}

export default EditProfileForm;