import { useEffect, useState } from "react";
import api from "../api/axios";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute(){

    const [loading,setLoading] = useState(true);
    const [isAuth,setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await api.get("/users/current-user");
                setIsAuth(true);
            } catch{
                setIsAuth(false);
            } finally{
                setLoading(false);
            }
        };

        checkAuth();
    },[]);

    if(loading) return <p>Checking authentication...</p>

    return isAuth ? <Outlet/> : <Navigate to="/login" replace/>
}

export default ProtectedRoute;