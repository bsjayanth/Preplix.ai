
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";
import "../style/Reports.scss";

/**
 * @description Formats a report date for display.
 */
const formatReportDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
};

/**
 * @description Displays all previously generated interview reports.
 */
const Reports = () => {
    const navigate = useNavigate();

    const {
        reports,
        reportsLoading,
        fetchAllReports
    } = useInterview();

    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        const loadReports = async () => {
            try {
                setError("");
                await fetchAllReports();
            } catch (err) {
                if (active) {
                    setError(
                        err.response?.data?.message ||
                        "Unable to load your interview reports."
                    );
                }
            }
        };

        loadReports();

        return () => {
            active = false;
        };
    }, [fetchAllReports]);

    /**
     * @description Opens the selected interview report.
     */
    const handleOpenReport = (interviewId) => {
        navigate(`/interview/${interviewId}`);
    };

    /**
     * @description Retries fetching the user's report history.
     */
    const handleRefresh = async () => {
        try {
            setError("");
            await fetchAllReports();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to refresh your reports."
            );
        }
    };

    return (
        <section className="reports-page">
            <header className="reports-page-header">
                <div>
                    <span className="reports-page-eyebrow">
                        YOUR PREPARATION HISTORY
                    </span>

                    <h1>My Interview Reports</h1>

                    <p>
                        Access and review your previously generated
                        interview preparation reports.
                    </p>
                </div>

                <button
                    type="button"
                    className="reports-refresh-btn"
                    onClick={handleRefresh}
                    disabled={reportsLoading}
                >
                    {reportsLoading ? "Refreshing..." : "Refresh"}
                </button>
            </header>

            {reportsLoading ? (
                <div className="reports-page-state">
                    <div className="reports-loading-spinner"></div>
                    <p>Loading your interview reports...</p>
                </div>
            ) : error ? (
                <div className="reports-page-error" role="alert">
                    <p>{error}</p>

                    <button
                        type="button"
                        onClick={handleRefresh}
                    >
                        Try again
                    </button>
                </div>
            ) : reports.length === 0 ? (
                <div className="reports-page-empty">
                    <div className="reports-empty-icon">▤</div>

                    <h2>No reports generated yet</h2>

                    <p>
                        Your interview preparation reports will appear
                        here after you generate your first report.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                    >
                        Create your first report
                    </button>
                </div>
            ) : (
                <div className="reports-page-grid">
                    {reports.map((item) => (
                        <article
                            className="report-history-card"
                            key={item._id}
                        >
                            <div className="history-card-top">
                                <div className="history-card-icon">
                                    ▤
                                </div>

                                <div className="history-card-info">
                                    <h3>
                                        {item.jobTitle ||
                                            "Interview Report"}
                                    </h3>

                                    <span className="history-date">
                                        Created on{" "}
                                        {formatReportDate(item.createdAt)}
                                    </span>
                                </div>
                            </div>

                            <div className="history-card-bottom">
                                <div className="history-score">
                                    <span className="history-score-value">
                                        {Number(item.matchScore) || 0}%
                                    </span>

                                    <span className="history-score-label">
                                        Profile Match
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className="history-open-btn"
                                    onClick={() =>
                                        handleOpenReport(item._id)
                                    }
                                >
                                    View Report →
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Reports;
