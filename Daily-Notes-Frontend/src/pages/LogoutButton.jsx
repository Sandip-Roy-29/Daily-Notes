import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await api.post("/users/logout");
            navigate("/login");
        } catch (error) {
            console.log("Logout failed: ",error);
        }
    }

    return(
        <button onClick={handleLogout}>
            Logout
        </button>
    )
}

export default LogoutButton;