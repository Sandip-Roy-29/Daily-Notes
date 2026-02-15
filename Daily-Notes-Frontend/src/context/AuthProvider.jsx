import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import { changePassword, fetchUser, loginUser, logoutUser, registerUser, updateUserInfo } from "../api/auth.api";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            setActionLoading(true);
            try {
                const res = await fetchUser();
                setUser(res.data.data);
            } catch(err) {
                setError(err.response?.data?.message || "Failed to fetch user");
                setUser(null);
            } finally {
                setAuthLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    const register = async (data) => {
        setActionLoading(true);
        setError(null);

        try {
            const res = await registerUser(data);
            setUser(res.data);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
            return false;
        } finally {
            setActionLoading(false);
        }
    }

    const login = async (identifier, password) => {
        setActionLoading(true);
        setError(null);

        try {
            const res = await loginUser({ identifier, password });
            setUser(res.data);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
            return false;
        } finally {
            setActionLoading(false);
        }
    };

    const refreshUser = async () => {
        try {
            const res = await fetchUser();
            setUser(res.data);
        } catch {
            setUser(null);
        }
    }

    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);
        } catch (err) {
            setError(err.response?.data?.message || "Logout failed");
        } finally {
            setActionLoading(false);
        }
    };

    const changeUserPassword = async (currentPassword, newPassword, confirmPassword) => {
        setActionLoading(true);
        setError(null);

        try {
            await changePassword({
                currentPassword,
                newPassword,
                confirmPassword
            })
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Password change failed");
            return false;
        } finally {
            setActionLoading(false);
        }
    }

    const UpdateInfo = async (username) => {
        setActionLoading(true);
        setError(null);

        try {
            const res = await updateUserInfo({username});
            setUser(res.data);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Username change failed");
            return false;
        } finally {
            setActionLoading(false);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuth: !!user,
                authLoading,
                actionLoading,
                error,
                login,
                logout,
                changeUserPassword,
                setUser,
                refreshUser,
                UpdateInfo,
                register
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};