import { useAuth } from "../hooks/useAuth";

function LogoutButton() {
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
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