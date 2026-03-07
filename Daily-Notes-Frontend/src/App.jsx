import { AuthProvider } from "./context/AuthProvider";
import { CurrentNoteProvider } from "./context/CurrentNoteProvider";
import AppRoutes from "./routes/AppRoutes";

function App() {

  return (
    <AuthProvider>
      <CurrentNoteProvider>
        <AppRoutes/>  
      </CurrentNoteProvider>
    </AuthProvider>
  )
}

export default App;