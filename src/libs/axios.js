import axios from "axios";

const baseUrl = 'https://auth-api.mateomartinez.dev/api/v1/';

export const api = axios.create({
    baseURL: baseUrl,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});