import { useState } from "react";
import { useNavigate } from "react-router-dom"
import api from "../api/axios";

function ChangePassword(){
    const navigate = useNavigate();
    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if(newPassword.length < 8){
            alert("Password must be at least 8 characters");
            return;
        }
        
        if(newPassword !== confirmPassword){
            alert("Password do not match");
            return;
        }

        try {
            await api.post(
                "/users/change-password",
                {
                    oldPassword,
                    newPassword,
                    confirmPassword
                }
            )

            alert("Password changed successfully. Please log in again.")
            navigate("/login")
        } catch (error) {
            console.log("Password change failed: ",error.response?.data?.message);
            
        }
    }


    return(
        <div>
            <h2>Password change</h2>

            <form onSubmit={handleChangePassword}>
                <div>
                    <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>

                <div>
                    <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Enter</button>
            </form>
        </div>
    )
}

export default ChangePassword;