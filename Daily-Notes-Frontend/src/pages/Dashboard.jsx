import { useEffect, useState } from "react";
import api from "../api/axios"
import LogoutButton from "../components/LogoutButton";

function Dashboard(){
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/users/current-user");
                setUser(res.data.data);
            } catch (err) {
                setError("Failed to load user",err);
            } finally{
                setLoading(false);
            }
        }

        fetchUser();
    },[])

    if(loading) return <p>Loading dashboard...</p>;
    if(error) return <p style={{ color:"red" }}>{error}</p>;
    if(!user) return null;

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