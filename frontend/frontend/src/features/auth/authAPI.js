import axios from "axios";

const BASE_URL = "http://localhost:5000/api/auth";

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, { email, password })
        return response.data;

    } catch (error) {
        throw error.response?.data || { message: "Login Failed" }
    }
}

export const logoutUser = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Logout failed");
    }
};

export const registerUser = async (userData) => {
    const response = await axios.post("http://localhost:5000/api/auth/signup", userData, {
        withCredentials: true,
    });
    return response.data;
};