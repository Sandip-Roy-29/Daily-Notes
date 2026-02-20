import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../ui/Loader";

function ProtectedRoute(){

    const { isAuth, authLoading} = useAuth();

    if(authLoading) return <Loader/>

    return isAuth ? <Outlet/> : <Navigate to="/auth" replace/>
}

export default ProtectedRoute;