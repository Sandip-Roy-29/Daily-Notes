import api from "./axios"

export const sendMessage = async (data) => {
    const res = await api.post("/contact", data);
    return res.data;
}