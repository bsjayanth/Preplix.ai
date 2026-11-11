
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

/**
 * @description Protects application routes and displays a branded loading
 * screen while the user's authentication status is being verified.
 */
const Protected = ({ children }) => {
    const { loading, user } = useAuth();
    const location = useLocation();

    // Wait until the authentication check is complete.
    if (loading) {
        return (
            <main className="app-loading">
                <div className="app-loading-content">
                    <div className="app-loading-brand">
                        Preplix<span>.ai</span>
                    </div>

                    <div className="app-loading-spinner"></div>

                    <h2>Getting things ready</h2>

                    <p>
                        Preparing your workspace. Just a moment.
                    </p>

                    <div className="app-loading-progress">
                        <span></span>
                    </div>
                </div>

                <span className="app-loading-footer">
                    PREPARE SMARTER. STAND OUT.
                </span>
            </main>
        );
    }

    // Redirect unauthenticated users to the login page.
    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return children;
};

export default Protected;
