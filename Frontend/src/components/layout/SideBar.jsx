
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";
import "./Sidebar.scss";

/**
 * @description Displays application navigation, account information,
 * appearance settings and logout functionality.
 */
const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [logoutError, setLogoutError] = useState("");

    const { user, handleLogout } = useAuth();
    const { theme, changeTheme } = useTheme();

    const navigate = useNavigate();

    /**
     * @description Logs out the current user and redirects to login.
     */
    const handleUserLogout = async () => {
        try {
            setLogoutError("");
            await handleLogout();

            navigate("/login", { replace: true });
        } catch (error) {
            setLogoutError(
                error.response?.data?.message ||
                "Unable to log out. Please try again."
            );
        }
    };

    const username =
        user?.username ||
        user?.name ||
        user?.fullName ||
        "User";

    const email = user?.email || "No email available";

    return (
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

            <div className="sidebar-header">
                {!collapsed && (
                    <div className="sidebar-brand">
                        Preplix<span>.ai</span>
                    </div>
                )}

                <button
                    type="button"
                    className="sidebar-collapse-btn"
                    onClick={() => setCollapsed(!collapsed)}
                    aria-label={
                        collapsed ? "Expand sidebar" : "Collapse sidebar"
                    }
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed ? "›" : "‹"}
                </button>
            </div>

            <nav className="sidebar-navigation">
                {!collapsed && (
                    <span className="sidebar-section-label">
                        WORKSPACE
                    </span>
                )}

                <NavLink
                    to="/"
                    end
                    title="Dashboard"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <span className="sidebar-icon">⌂</span>

                    {!collapsed && <span>Dashboard</span>}
                </NavLink>

                <NavLink
                    to="/reports"
                    title="My Reports"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <span className="sidebar-icon">▤</span>

                    {!collapsed && <span>My Reports</span>}
                </NavLink>

                {!collapsed && (
                    <span className="sidebar-section-label account-label">
                        ACCOUNT
                    </span>
                )}

                <NavLink
                    to="/profile"
                    title="My Profile"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <span className="sidebar-icon">♙</span>

                    {!collapsed && <span>My Profile</span>}
                </NavLink>
            </nav>

            <div className="sidebar-bottom">

                <div className="sidebar-appearance">

                    {!collapsed ? (
                        <>
                            <label className="appearance-label">
                                APPEARANCE
                            </label>

                            <div className="theme-control">

                                <div className="theme-toggle">

                                    <button
                                        type="button"
                                        className={`theme-option ${
                                            theme === "light" ? "active" : ""
                                        }`}
                                        onClick={() => changeTheme("light")}
                                        aria-label="Enable light theme"
                                        aria-pressed={theme === "light"}
                                        title="Light theme"
                                    >
                                        <span className="theme-icon">☀</span>
                                        <span>Light</span>
                                    </button>

                                    <button
                                        type="button"
                                        className={`theme-option ${
                                            theme === "dark" ? "active" : ""
                                        }`}
                                        onClick={() => changeTheme("dark")}
                                        aria-label="Enable dark theme"
                                        aria-pressed={theme === "dark"}
                                        title="Dark theme"
                                    >
                                        <span className="theme-icon">☾</span>
                                        <span>Dark</span>
                                    </button>

                                </div>

                                <button
                                    type="button"
                                    className={`system-theme-btn ${
                                        theme === "system" ? "selected" : ""
                                    }`}
                                    onClick={() => changeTheme("system")}
                                    aria-pressed={theme === "system"}
                                >
                                    <span className="system-theme-icon">◉</span>
                                    <span>System preference</span>

                                    {theme === "system" && (
                                        <span className="system-check">✓</span>
                                    )}
                                </button>

                            </div>
                        </>
                    ) : (
                        <button
                            type="button"
                            className="collapsed-theme-btn"
                            onClick={() =>
                                changeTheme(
                                    theme === "dark" ? "light" : "dark"
                                )
                            }
                            title={`Switch to ${
                                theme === "dark" ? "light" : "dark"
                            } theme`}
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? "☾" : "☀"}
                        </button>
                    )}

                </div>

                {logoutError && !collapsed && (
                    <p className="sidebar-error" role="alert">
                        {logoutError}
                    </p>
                )}

                <div className="sidebar-user">

                    <div className="user-avatar">
                        {username.charAt(0).toUpperCase()}
                    </div>

                    {!collapsed && (
                        <div className="user-details">
                            <strong>{username}</strong>
                            <span>{email}</span>
                        </div>
                    )}

                </div>

                <button
                    type="button"
                    className="sidebar-logout-btn"
                    onClick={handleUserLogout}
                    title="Logout"
                >
                    <span className="sidebar-icon">↪</span>

                    {!collapsed && <span>Logout</span>}
                </button>

            </div>

        </aside>
    );
};

export default Sidebar;
