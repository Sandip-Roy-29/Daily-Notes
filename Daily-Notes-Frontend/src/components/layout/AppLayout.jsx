import Navbar from "../layout/Navbar";

function AppLayout({ children }){
    return (
        <div className="h-screen flex flex-col">
            <Navbar/>
            <div className="flex flex-1 overflow-hidden">
                

            <main className="max-w-7xl mx-auto p-6">
                {children}
            </main>
            </div>
        </div>
    )
}

export default AppLayout;