import axios from "axios";

const api = axios.create(
    {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        withCredentials: true
    }
)

api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    const isRefreshRequest =
      originalRequest.url === "/users/refresh-token" ||
      originalRequest.url?.endsWith("/users/refresh-token");

    if (isRefreshRequest) {
      return Promise.reject(err);
    }

    if (
      err.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!document.cookie.includes("refreshToken")) {
        window.location.href = "/login";
        return Promise.reject(err);
      }

      try {
        const refreshRes = await api.post("/users/refresh-token");

        if (refreshRes.status !== 200) {
          throw new Error("Refresh failed");
        }

        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);


export default api;