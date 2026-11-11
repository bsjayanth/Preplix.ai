
import { createContext, useState } from "react";

export const InterviewContext = createContext(null);

/**
 * @description Provides interview report state and loading status throughout the application.
 */
export const InterviewProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [reportsLoading, setReportsLoading] = useState(false);

    const [report, setReport] = useState(null);
    const [reports, setReports] = useState([]);

    return (
        <InterviewContext.Provider
            value={{
                loading,
                setLoading,
                reportsLoading,
                setReportsLoading,
                report,
                setReport,
                reports,
                setReports
            }}
        >
            {children}
        </InterviewContext.Provider>
    );
};
