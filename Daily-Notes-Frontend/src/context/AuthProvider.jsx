import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import api from "../api/axios";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/users/current-user");
                setUser(res.data.data);
            } catch(err) {
                if(err.rresponse?.status === 401) setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (identifier, password) => {
        await api.post("/users/login", { identifier, password });
        const res = await api.get("/users/current-user");
        setUser(res.data.data);
    };

    const logout = async () => {
        await api.post("/users/logout");
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuth: !!user,
                loading,
                login,
                logout,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};