
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useInterview } from "../hooks/useInterview";
import "../style/interview.scss";

const Interview = () => {
    const navigate = useNavigate();
    const { interviewId } = useParams();

    const { loading, report, fetchReportById } = useInterview();

    const [activeSection, setActiveSection] = useState("technical");
    const [expandedQuestion, setExpandedQuestion] = useState(0);
    const [activeDay, setActiveDay] = useState(1);
    const [error, setError] = useState("");

    // Keep the latest fetch function available without triggering repeated requests.
    const fetchReportRef = useRef(fetchReportById);
    fetchReportRef.current = fetchReportById;

    // Fetch the report whenever the URL contains a different report ID.
    useEffect(() => {
        let isActive = true;

        const loadReport = async () => {
            if (!interviewId) {
                setError("No interview report ID was provided.");
                return;
            }

            setError("");

            try {
                await fetchReportRef.current(interviewId);
            } catch (error) {
                if (isActive) {
                    setError(
                        error.response?.data?.message ||
                        "Unable to load this interview report. Please try again."
                    );
                }
            }
        };

        loadReport();

        return () => {
            isActive = false;
        };
    }, [interviewId]);

    // Use report data only when it belongs to the ID in the current URL.
    const reportMatchesRoute = report?._id === interviewId;
    const currentReport = reportMatchesRoute ? report : null;

    const technicalQuestions = currentReport?.technicalQuestions || [];
    const behavioralQuestions = currentReport?.behavioralQuestions || [];
    const skillGaps = currentReport?.skillGaps || [];

    const preparationPlan = currentReport?.preparationPlan || {};
    const roadmap = preparationPlan.days || [];

    const matchScore = Math.min(
        100,
        Math.max(0, Number(currentReport?.matchScore) || 0)
    );

    const scoreDegrees = matchScore * 3.6;

    const selectedDay =
        roadmap.find((day) => day.day === activeDay) || roadmap[0];

    // Switch between the report sections.
    const selectSection = (section) => {
        setActiveSection(section);
        setExpandedQuestion(0);
    };

    const questions =
        activeSection === "technical"
            ? technicalQuestions
            : behavioralQuestions;

    // Show a loading screen while the requested report is being fetched.
    if (loading && !currentReport) {
        return (
            <main className="interview-page">
                <div className="report-container">
                    <section className="report-main">
                        <h2>Loading your interview report...</h2>
                        <p>
                            Please wait while we retrieve your personalised
                            interview report.
                        </p>
                    </section>
                </div>
            </main>
        );
    }

    // Show an error when the report cannot be retrieved.
    if (error || !currentReport) {
        return (
            <main className="interview-page">
                <div className="report-container">
                    <header className="report-header">
                        <div className="report-brand">
                            Preplix<span>.ai</span>
                        </div>

                        <button
                            className="report-back-button"
                            type="button"
                            onClick={() => navigate("/")}
                        >
                            <span>←</span>
                            Back to home
                        </button>
                    </header>

                    <section className="report-main">
                        <h2>
                            {error
                                ? "Unable to load interview report"
                                : "No interview report found"}
                        </h2>

                        <p>
                            {error ||
                                "This interview report could not be found. Generate a new report to continue."}
                        </p>

                        <button
                            className="report-back-button"
                            type="button"
                            onClick={() => navigate("/")}
                        >
                            Generate a report
                        </button>
                    </section>
                </div>
            </main>
        );
    }

    return (
        <main className="interview-page">
            <div className="report-container">
                <header className="report-header">
                    <div className="report-brand">
                        Preplix<span>.ai</span>
                    </div>

                    <div className="report-header-right">
                        <span className="report-status">
                            Interview preparation
                        </span>

                        <button
                            className="report-back-button"
                            type="button"
                            onClick={() => navigate("/")}
                        >
                            <span>←</span>
                            Back to home
                        </button>
                    </div>
                </header>

                <section className="report-intro">
                    <div>
                        <span className="report-eyebrow">
                            YOUR PERSONALIZED ANALYSIS
                        </span>

                        <h1>
                            {currentReport.jobTitle || "Interview"}{" "}
                            <span>report.</span>
                        </h1>

                        <p>
                            Explore your interview questions, identify skill gaps
                            and follow your personalized preparation roadmap.
                        </p>
                    </div>

                    <span className="sample-label">
                        AI generated report
                    </span>
                </section>

                <div className="report-layout">
                    <aside className="report-sidebar">
                        <span className="sidebar-heading">
                            SECTIONS
                        </span>

                        <button
                            type="button"
                            className={`sidebar-link ${
                                activeSection === "technical" ? "active" : ""
                            }`}
                            onClick={() => selectSection("technical")}
                        >
                            <span className="sidebar-icon">⌘</span>
                            Technical Questions
                            <span className="sidebar-count">
                                {technicalQuestions.length}
                            </span>
                        </button>

                        <button
                            type="button"
                            className={`sidebar-link ${
                                activeSection === "behavioral" ? "active" : ""
                            }`}
                            onClick={() => selectSection("behavioral")}
                        >
                            <span className="sidebar-icon">☷</span>
                            Behavioral Questions
                            <span className="sidebar-count">
                                {behavioralQuestions.length}
                            </span>
                        </button>

                        <button
                            type="button"
                            className={`sidebar-link ${
                                activeSection === "roadmap" ? "active" : ""
                            }`}
                            onClick={() => selectSection("roadmap")}
                        >
                            <span className="sidebar-icon">↗</span>
                            Roadmap
                            <span className="sidebar-count">
                                {roadmap.length}
                            </span>
                        </button>

                        <div className="sidebar-note">
                            <span>✦</span>

                            <p>
                                Consistent preparation is the key to your
                                next opportunity.
                            </p>
                        </div>
                    </aside>

                    <section className="report-main">
                        {(activeSection === "technical" ||
                            activeSection === "behavioral") && (
                            <>
                                <div className="section-title-row">
                                    <div>
                                        <span className="section-eyebrow">
                                            ASSESSMENT
                                        </span>

                                        <h2>
                                            {activeSection === "technical"
                                                ? "Technical Questions"
                                                : "Behavioral Questions"}
                                        </h2>
                                    </div>

                                    <span className="question-count">
                                        {questions.length} questions
                                    </span>
                                </div>

                                <div className="question-list">
                                    {questions.map((item, index) => (
                                        <article
                                            className={`question-card ${
                                                expandedQuestion === index
                                                    ? "expanded"
                                                    : ""
                                            }`}
                                            key={index}
                                        >
                                            <button
                                                type="button"
                                                className="question-trigger"
                                                aria-expanded={
                                                    expandedQuestion === index
                                                }
                                                onClick={() =>
                                                    setExpandedQuestion(
                                                        expandedQuestion === index
                                                            ? null
                                                            : index
                                                    )
                                                }
                                            >
                                                <span className="question-number">
                                                    Q
                                                    {String(index + 1).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </span>

                                                <span className="question-text">
                                                    {item.question}
                                                </span>

                                                <span className="question-chevron">
                                                    {expandedQuestion === index
                                                        ? "−"
                                                        : "+"}
                                                </span>
                                            </button>

                                            {expandedQuestion === index && (
                                                <div className="question-answer">
                                                    <div className="answer-block">
                                                        <span className="answer-label">
                                                            INTENTION
                                                        </span>

                                                        <p>{item.intention}</p>
                                                    </div>

                                                    <div className="answer-block">
                                                        <span className="answer-label">
                                                            SUGGESTED ANSWER
                                                        </span>

                                                        <p>{item.answer}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </article>
                                    ))}

                                    {questions.length === 0 && (
                                        <p>
                                            No questions available in this section.
                                        </p>
                                    )}
                                </div>
                            </>
                        )}

                        {activeSection === "roadmap" && (
                            <>
                                <div className="section-title-row">
                                    <div>
                                        <span className="section-eyebrow">
                                            YOUR ACTION PLAN
                                        </span>

                                        <h2>Preparation Roadmap</h2>
                                    </div>

                                    <span className="question-count">
                                        {preparationPlan.totalDays ||
                                            roadmap.length}{" "}
                                        days
                                    </span>
                                </div>

                                <div className="roadmap-layout">
                                    <div className="roadmap-days">
                                        {roadmap.map((day) => (
                                            <button
                                                type="button"
                                                key={day.day}
                                                className={`roadmap-day ${
                                                    selectedDay?.day === day.day
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setActiveDay(day.day)
                                                }
                                            >
                                                <span className="roadmap-day-number">
                                                    {String(day.day).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </span>

                                                <span className="roadmap-day-label">
                                                    Day {day.day}
                                                </span>

                                                <span className="roadmap-day-arrow">
                                                    →
                                                </span>
                                            </button>
                                        ))}
                                    </div>

                                    {selectedDay ? (
                                        <div className="roadmap-detail">
                                            <span className="section-eyebrow">
                                                DAY {selectedDay.day}
                                            </span>

                                            <h3>{selectedDay.focus}</h3>

                                            <span className="answer-label">
                                                TASKS TO COMPLETE
                                            </span>

                                            <ul>
                                                {(selectedDay.tasks || []).map(
                                                    (task, index) => (
                                                        <li key={index}>
                                                            <span className="task-bullet">
                                                                ✓
                                                            </span>

                                                            {task}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    ) : (
                                        <div className="roadmap-detail">
                                            <p>
                                                No preparation roadmap available.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="summary-tip">
                                    <span>✦</span>

                                    <p>
                                        Difficulty:{" "}
                                        {preparationPlan.difficulty ||
                                            "Not specified"}
                                        <br />
                                        Daily commitment:{" "}
                                        {preparationPlan.dailyCommitmentHours ||
                                            "Not specified"}{" "}
                                        hours
                                    </p>
                                </div>
                            </>
                        )}
                    </section>

                    <aside className="report-summary">
                        <div className="summary-section">
                            <span className="sidebar-heading">
                                MATCH SCORE
                            </span>

                            <div
                                className="score-circle"
                                style={{
                                    background: `radial-gradient(circle, #ffffff 68%, transparent 70%), conic-gradient(#34a853 0deg ${scoreDegrees}deg, #e8e8ed ${scoreDegrees}deg 360deg)`
                                }}
                            >
                                <div>
                                    <strong>{matchScore}</strong>
                                    <span>%</span>
                                </div>
                            </div>

                            <p className="score-description">
                                {matchScore >= 80
                                    ? "Strong match for this role"
                                    : matchScore >= 60
                                        ? "Good potential for this role"
                                        : "More preparation recommended"}
                            </p>
                        </div>

                        <div className="summary-divider" />

                        <div className="summary-section">
                            <span className="sidebar-heading">
                                SKILL GAPS
                            </span>

                            <div className="skill-gap-list">
                                {skillGaps.map((gap, index) => (
                                    <div
                                        key={index}
                                        className={`skill-gap ${gap.severity}`}
                                    >
                                        <span>{gap.skill}</span>
                                        <small>{gap.severity}</small>
                                    </div>
                                ))}

                                {skillGaps.length === 0 && (
                                    <p>No skill gaps identified.</p>
                                )}
                            </div>
                        </div>

                        <div className="summary-divider" />

                        <div className="summary-tip">
                            <span>✦</span>

                            <p>
                                Focus on your high-priority skill gaps first
                                to improve your preparation.
                            </p>
                        </div>
                    </aside>
                </div>

                <footer className="report-footer">
                    <span>Preplix.ai</span>
                    <span>Prepare smarter. Stand out.</span>
                </footer>
            </div>
        </main>
    );
};

export default Interview;
