import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import {
  changePassword,
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserInfo,
  deleteUser,
} from "../api/auth.api";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetchUser();
        setUser(res.data);
        console.log("fetch user is called");
      } catch (err) {
        if (err.response?.status === 401) {
          // Not logged in — normal state
          setUser(null);
        } else {
          setActionError("Failed to fetch user");
        }
      } finally {
        setAuthLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const register = async (data) => {
    setActionLoading(true);
    setAuthError(null);

    try {
      const res = await registerUser(data);
      setUser(res.data);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setActionLoading(false);
    }
  };

  const login = async (identifier, password) => {
    setActionLoading(true);
    setAuthError(null);

    try {
      const res = await loginUser({ identifier, password });
      setUser(res.data);
      console.log("login user is called");

      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setActionLoading(false);
    }
  };

  const removeUser = async () => {
    setActionLoading(true);
    setActionError("");

    try {
      await deleteUser();
      setUser(null);
      navigate("/auth", { replace: true });
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Deletion failed";
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
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
  };

  const logout = async () => {
    setActionLoading(true);
    setActionError(null);

    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      setActionError(err.response?.data?.message || "Logout failed");
    } finally {
      setActionLoading(false);
    }
  };

  const changeUserPassword = async (
    currentPassword,
    newPassword,
    confirmPassword,
  ) => {
    setActionLoading(true);
    setActionError(null);

    try {
      await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Password change failed";
      setActionError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setActionLoading(false);
    }
  };

  const UpdateInfo = async (username) => {
    setActionLoading(true);
    setActionError(null);

    try {
      const res = await updateUserInfo({ username });
      setUser(res.data);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Username change failed";
      setActionError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth: !!user,
        authLoading,
        actionLoading,
        actionError,
        authError,
        login,
        logout,
        changeUserPassword,
        setUser,
        refreshUser,
        UpdateInfo,
        register,
        removeUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
