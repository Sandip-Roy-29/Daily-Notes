import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function ProtectedRoute(){

    const { isAuth, loading} = useAuth();

    if(loading) return <p>Checking authentication...</p>

    return isAuth ? <Outlet/> : <Navigate to="/login" replace/>
}

export default ProtectedRoute;