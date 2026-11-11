//State layer
import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext(null);

/**
 * @description Provides authentication state and user information throughout the application.
 */
export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        /**
         * @description Checks the existing authentication session and retrieves the logged-in user.
         */
        const getAndSetUser = async () => {
            try {
                const data = await getMe();

                if (isMounted) {
                    setUser(data.user);
                }

            } catch (error) {
                if (isMounted) {
                    setUser(null);
                }

                if (error.response?.status !== 401) {
                    console.error("Failed to fetch user:", error);
                }

            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        getAndSetUser();

        return () => {
            isMounted = false;
        };

    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
