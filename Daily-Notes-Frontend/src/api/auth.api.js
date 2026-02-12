import api from "./axios"

export const registerUser = (data) => {
    const res = api.post("/users/register", data);
    return res.data;
}

export const loginUser = (data) => {
    const res = api.post("/users/login", data);
    return res.data;
}

export const logoutUser = () => {
    const res = api.post("/users/logout");
    return res.data;
}

export const refreshTokens = () => {
    const res = api.post("/users/refresh-token");
    return res.data;
}

export const changePassword = (data) => {
    const res = api.post("/users/change-password", data);
    return res.data;
}

export const fetchUser = () => {
    const res = api.get("/users/current-user");
    return res.data;
}

export const updateUserInfo = (data) => {
    const res = api.put("/users/update-credentials", data);
    return res.data;
}