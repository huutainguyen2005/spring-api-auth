import axios from "axios";
import { getAccessToken } from "../auth/oauth2.js";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const API_VERSION = "v1";

export const httpClient = axios.create({
  baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Header -> Authorization -> Bearer {token}
// Attach OAuth2 access token to every API call when available.
httpClient.interceptors.request.use((config) => {
  // This use Basic Auth
  // if (API_BASIC_USERNAME && API_BASIC_PASSWORD) {
  //     const token = btoa(`${API_BASIC_USERNAME}:${API_BASIC_PASSWORD}`);
  //     config.headers = config.headers || {};
  //     config.headers.Authorization = `Basic ${token}`;
  // }

  // This uses Bearer token (JWT)
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export function getErrorMessage(error, fallback = "Something went wrong") {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
}
