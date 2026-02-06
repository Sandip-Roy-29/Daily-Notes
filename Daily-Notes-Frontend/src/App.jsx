import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Note from "./pages/Note";
import LogoutButton from "./pages/LogoutButton";

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/notes" element={<Note/>}/>
    </Routes>
  )
}

export default App
