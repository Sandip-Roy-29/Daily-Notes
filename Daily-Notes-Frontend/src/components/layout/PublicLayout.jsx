import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const PublicLayout = () => {
    return (
        <>
            <Navbar/>
            <main className="min-h-screen p-6">
                <Outlet/>
            </main>
        </>
    )
}

export default PublicLayout;