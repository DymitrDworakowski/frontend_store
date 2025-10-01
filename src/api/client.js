import axios from "axios";

const API_URL = "https://backendstore-production.up.railway.app";

const client = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Helper to build auth headers when token is present
export function authHeader(token) {
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export default client;
