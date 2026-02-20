import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Input from "../ui/Input";
import Button from "../ui/Button";

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
            setError("Password must be at least 8 characters");
            return;
        }
        
        if(newPassword !== confirmPassword){
            setError("Passwords do not match");
            return;
        }
        
        if(newPassword === currentPassword){
            setError("New password must be different from current");
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
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input 
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <Input 
                    label="New Password"
                    type="password"
                    placeholder="Password must be at least 8 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <Input 
                    label="Confirm Password"
                    type="password"
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button 
                    type="submit" 
                    disabled={loading}
                    loading={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                >
                    Update Password
                </Button>
            </form>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className="text-green-400 text-sm">{success}</p>}
        </div>
    )
}

export default ChangePasswordForm;