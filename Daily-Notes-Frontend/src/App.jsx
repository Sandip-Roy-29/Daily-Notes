
import { AuthProvider } from "./context/AuthProvider";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {

  return (
    <AuthProvider>
      <Navbar/>
      <AppRoutes/>  
    </AuthProvider>
  )
}

export default App;