
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

export const ThemeContext = createContext(null);

/**
 * @description Provides application-wide theme preferences.
 */
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("preplix-theme") || "system";
    });

    useEffect(() => {
        const root = document.documentElement;

        root.setAttribute("data-theme", theme);
        localStorage.setItem("preplix-theme", theme);
    }, [theme]);

    /**
     * @description Changes the application appearance.
     */
    const changeTheme = (selectedTheme) => {
        setTheme(selectedTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * @description Provides access to the theme context.
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }

    return context;
};
