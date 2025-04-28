import axios from "axios";

// Dynamically detect base URL (for production) or fall back to the VITE_BASE_URL from the .env file
const baseUrl = window.location.origin || import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
    baseURL: `${baseUrl}/api`, // This will use window.location.origin in production and VITE_BASE_URL locally
    withCredentials: true,
});
