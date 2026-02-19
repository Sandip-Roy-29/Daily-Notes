import axios from "axios";

const api = axios.create(
    {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        withCredentials: true
    }
)

api.interceptors.response.use(
    // ✅ Success
    (response) => response,

    // ❌ Error
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;
        const url = originalRequest?.url;

        // 1️⃣ Ignore public auth check
        if (url?.includes("/users/current-user") ||
            url?.includes("/users/login") ||
            url?.includes("/users/register")
        ) {
            return Promise.reject(error);
        }

        // 2️⃣ If refresh token request itself failed → STOP
        if (url?.includes("/users/refresh-token")) {
            return Promise.reject(error);
        }

        // 3️⃣ Try refresh ONLY ONCE for protected routes
        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await api.post("/users/refresh-token");
                return api(originalRequest);
            } catch (refreshError) {
                // Hard logout
                // window.location.href = "/auth";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


export default api;