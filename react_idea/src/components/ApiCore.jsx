import axios from "axios";

export const apiInstance = axios.create(`${import.meta.env.VITE_API_BASE_URL}`);