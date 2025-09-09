import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/login`,
            { email, password },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Login Failed" };
    }
};

export const logoutUser = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/api/logout`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Logout failed");
    }
};