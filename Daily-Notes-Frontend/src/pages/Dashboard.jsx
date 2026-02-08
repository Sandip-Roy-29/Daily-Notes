import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../hooks/useAuth"

function Dashboard(){
    
    const { user } = useAuth();

    return(
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, <strong>{user.username}</strong></p>
            <p>Email: {user.email}</p>
            <LogoutButton/>
        </div>
    )
}

export default Dashboard;