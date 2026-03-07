import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Settings from "../pages/Settings";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import NotFound from "../pages/NotFound";
import AppLayout from "../components/layout/AppLayout";
import PublicLayout from "../components/layout/PublicLayout";
import AuthLayout from "../components/layout/AuthLayout";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import Contact from "../pages/Contact";
import NoteDetail from "../pages/NoteDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout/>}>
      <Route path="/" element={<Home />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      </Route>

      <Route element={<AuthLayout/>}>
      <Route path="/auth" element={<Auth/>}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notes/:noteId" element={<NoteDetail />} />
        <Route path="/contact" element={<Contact />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;