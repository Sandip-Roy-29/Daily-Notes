import axios from "axios";

const api = axios.create(
    {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        withCredentials: true
    }
)

api.interceptors.response.use(

    // Success handler
    res => res,

    // Error handler(4xx/5xx)
    async err => {

        // Axios attaches the original request config to the error.
        const originalRequest = err.config;

        // Check for expired access token
        if(err.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;

            try {

                // Try refreshing the token
                await api.post("/users/refresh-token");

                // Retry the original request
                return api(originalRequest);

            } catch (refreshError) {

                // Redirect to login
                window.location.href = "/login";

                // Return the error
                return Promise.reject(refreshError);
            }
        }
        // Return the error
        return Promise.reject(err);
    }
)

export default api;