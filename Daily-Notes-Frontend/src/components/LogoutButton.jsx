import api from "../api/axios";

function LogoutButton() {
    const handleLogout = async () => {
        try {
            await api.post("/users/logout");
            window.location.href = "/login";
        } catch (error) {
            console.log("Logout failed: ",error.response?.data?.message);
        }
    }

    return(
        <button onClick={handleLogout}>
            Logout
        </button>
    )
}

export default LogoutButton;