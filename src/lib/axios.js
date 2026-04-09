import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_API,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle 401/403 responses
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401 || error.response?.status === 403) {
//       // Clear invalid token
//       Cookies.remove("access_token", { path: "/" });
//       Cookies.remove("role", { path: "/" });
      
//       // Redirect to login
//       if (typeof window !== "undefined") {
//         window.location.href = "/auth/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
