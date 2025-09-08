import axios from "axios";
import { API_BASE_URL } from "./config.js";

// axios instance with interceptors to send cookies with requests
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // to send cookies with requests
});

// Sign up  
export const signUp = async (userData) => {
    try {
        const response = await api.post("/api/auth/signup", userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

