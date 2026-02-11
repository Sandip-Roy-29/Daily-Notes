import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import { AuthProvider } from "./context/AuthProvider";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateNotes from "./pages/CreateNotes";
import UpdateNoteTitle from "./pages/UpdateNoteTitle";
import CurrentNote from "./pages/CurrentNote";
import { CurrentNoteProvider } from "./context/CurrentNoteProvider";
import CurrentContent from "./pages/CurrentContent";

function App() {

  return (
      <AuthProvider>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            <Route element={<ProtectedRoute/>}>
              <Route path="/notes" element={<Notes/>}/>
              <Route path="/change-password" element={<ChangePassword/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/edit-profile" element={<EditProfile/>}/>
              <Route path="/notes/new" element={<CreateNotes/>}/>
              <Route path="/notes/:noteId/edit-title" element={
                <CurrentNoteProvider>
                  <UpdateNoteTitle/>
                </CurrentNoteProvider>
                }/>
              <Route path="/notes/:noteId" element={
                <CurrentNoteProvider>
                <CurrentNote/>
                </CurrentNoteProvider>
                }/>
              <Route path="/notes/:noteId/contents" element={
                <CurrentNoteProvider>
                <CurrentContent/>
                </CurrentNoteProvider>
                }/>
              </Route>
          </Routes>
      </AuthProvider>
  )
}

export default App
