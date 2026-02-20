import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Input from "../ui/Input";
import Button from "../ui/Button";

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
            if(res) {
                setSuccess("Username updated successfully");
                setUsername("");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to change username");
        } finally {
            setLoading(false);
        }
        
    }

    return(
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input 
                    label="Username"
                    type="text"
                    placeholder="Enter new username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={error}
                />
                <Button 
                    type="submit" 
                    disabled={loading}
                    loading={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                >
                    Update Username
                </Button>
            </form>

            {success && <p className="text-green-400 text-sm">{success}</p>}
        </div>
    )
}

export default EditProfileForm;