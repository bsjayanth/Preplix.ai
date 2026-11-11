
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

/**
 * @description Registers a new user account.
 */
export const register = async ({ username, email, password }) => {
    try {
        const response = await api.post("/api/auth/register", {
            username,
            email,
            password
        });

        return response.data;

    } catch (error) {
        console.error("Registration API failed:", error);
        throw error;
    }
};

/**
 * @description Authenticates an existing user.
 */
export const login = async ({ email, password }) => {
    try {
        const response = await api.post("/api/auth/login", {
            email,
            password
        });

        return response.data;

    } catch (error) {
        console.error("Login API failed:", error);
        throw error;
    }
};

/**
 * @description Logs out the currently authenticated user.
 */
export const logout = async () => {
    try {
        const response = await api.get("/api/auth/logout");

        return response.data;

    } catch (error) {
        console.error("Logout API failed:", error);
        throw error;
    }
};

/**
 * @description Retrieves the currently authenticated user's information.
 */
export const getMe = async () => {
    try {
        const response = await api.get("/api/auth/get-me");

        return response.data;

    } catch (error) {
        throw error;
    }
};
