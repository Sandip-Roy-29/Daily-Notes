import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-black px-4 py-8">
            <Outlet/>
        </div>
    )
}

export default AuthLayout;