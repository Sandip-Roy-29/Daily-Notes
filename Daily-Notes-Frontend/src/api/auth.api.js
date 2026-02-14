import api from "./axios"

export const registerUser = async (data) => {
    const res = await api.post("/users/register", data);
    return res.data;
}

export const loginUser = async (data) => {
    const res = await api.post("/users/login", data);
    return res.data;
}

export const logoutUser = async () => {
    const res = await api.post("/users/logout");
    return res.data;
}

export const refreshTokens = async () => {
    const res = await api.post("/users/refresh-token");
    return res.data;
}

export const changePassword = async (data) => {
    const res = await api.post("/users/change-password", data);
    return res.data;
}

export const fetchUser = async () => {
    const res = await api.get("/users/current-user");
    return res.data;
}

export const updateUserInfo = async (data) => {
    const res = await api.put("/users/update-credentials", data);
    return res.data;
}