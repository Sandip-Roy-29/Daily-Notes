import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function ChangePasswordForm(){
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const { changeUserPassword, logout} = useAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()){
            setError("All fields are required");
            return;
        }

        if(newPassword.length < 8){
            setError("Password must be atleast 8 character");
            return;
        }
        
        if(newPassword !== confirmPassword){
            setError("Password do not match");
            return;
        }
        
        if(newPassword === currentPassword){
            setError("New password must be different");
            return;
        }

        try {
            setError(null);
            setSuccess(null);
            setLoading(true);
            const res =  await changeUserPassword(
                currentPassword,
            newPassword,
            confirmPassword
            );
            if(res) {
                setSuccess("Password changed successfully");
    
                setCurrentPassword("");
                setConfirmPassword("");
                setNewPassword("");
    
                await logout();
                navigate("/login");
            }
                
        } catch (err) {
            setError(err.response?.data?.message || "Failed to change password");
        } finally {
            setLoading(false);
        } 
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
            <div>
                <label>Current Password</label>
                <input 
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)} 
                />
            </div>
            <div>
                <label>New Password</label>
                <input 
                type="password"
                placeholder="Password must be atleast 8 character"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} 
                />
            </div>
            <div>
                <label>Confirm Password</label>
                <input 
                type="password"
                placeholder="Enter confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} 
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

export default ChangePasswordForm;