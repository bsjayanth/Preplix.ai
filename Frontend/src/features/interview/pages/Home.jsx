
import { useState } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";
import "../style/home.scss";

const Home = () => {
    const navigate = useNavigate();
    const { generateReport, loading } = useInterview();

    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resumeFile, setResumeFile] = useState(null);
    const [error, setError] = useState("");

    /**
     * @description Handles resume selection and validates the uploaded PDF file.
     */
    const handleResumeChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            setResumeFile(null);
            return;
        }

        if (file.type !== "application/pdf") {
            setError("Please upload your resume in PDF format.");
            setResumeFile(null);
            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Resume file size must not exceed 5 MB.");
            setResumeFile(null);
            e.target.value = "";
            return;
        }

        setError("");
        setResumeFile(file);
    };

    /**
     * @description Generates an interview report and navigates to its unique report URL.
     */
    const handleGenerateReport = async (e) => {
        e.preventDefault();
        setError("");

        if (loading) return;

        if (!jobDescription.trim()) {
            setError("Please enter the job description.");
            return;
        }

        if (!resumeFile) {
            setError("Please upload your resume in PDF format.");
            return;
        }

        if (!selfDescription.trim()) {
            setError("Please enter your self-description.");
            return;
        }

        try {
            const response = await generateReport({
                jobDescription,
                selfDescription,
                resumeFile
            });

            const interviewId = response.interviewReport?._id;

            if (!interviewId) {
                throw new Error(
                    "Interview report ID was not returned by the server."
                );
            }

            navigate(`/interview/${interviewId}`);
        } catch (error) {
            console.error("Interview report generation failed:", error);

            setError(
                error.response?.data?.message ||
                error.message ||
                "Unable to generate your interview report. Please try again."
            );
        }
    };

    return (
        <main className="home" aria-busy={loading}>
            {loading && (
                <div className="generation-overlay" role="status" aria-live="polite">
                    <div className="generation-card">
                        <div className="generation-spinner">
                            <span></span>
                        </div>

                        <span className="generation-eyebrow">
                            PREPLIX.AI
                        </span>

                        <h2>Preparing your interview report</h2>

                        <p>
                            Analysing your resume, understanding your profile
                            and generating a personalised preparation plan.
                        </p>

                        <div className="generation-progress">
                            <span></span>
                        </div>

                        <span className="generation-note">
                            This may take a few moments. Please don't close this page.
                        </span>
                    </div>
                </div>
            )}

            <div className="home-container">
                {/* Brand header */}
                <header className="home-header">
                    <div className="brand-name">
                        Preplix<span>.ai</span>
                    </div>

                    <div className="brand-tagline">
                        Turn your potential
                        <br />
                        into <span>advantage.</span>
                    </div>

                    <p className="header-description">
                        AI-powered interview preparation designed to understand
                        your profile, decode opportunities, and help you present
                        your best self.
                    </p>

                    <div className="brand-caption">
                        PREPARE SMARTER. STAND OUT.
                    </div>
                </header>

                {/* Interview form */}
                <form
                    className="interview-input-group"
                    onSubmit={handleGenerateReport}
                >
                    {/* Job description */}
                    <section className="input-card job-card">
                        <div className="card-heading">
                            <div className="heading-icon">
                                <span>01</span>
                            </div>

                            <div>
                                <h2>Job description</h2>
                                <p>Tell us about the role you're targeting.</p>
                            </div>
                        </div>

                        <textarea
                            name="jobDescription"
                            id="jobDescription"
                            placeholder="Paste the job description here..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            required
                        />

                        <span className="input-caption">
                            Include responsibilities, qualifications and requirements.
                        </span>
                    </section>

                    {/* User profile */}
                    <section className="input-card profile-card">
                        <div className="card-heading">
                            <div className="heading-icon">
                                <span>02</span>
                            </div>

                            <div>
                                <h2>Your profile</h2>
                                <p>Help us understand your professional background.</p>
                            </div>
                        </div>

                        {/* Resume upload */}
                        <div className="input-group">
                            <label htmlFor="resume">
                                Upload your resume
                            </label>

                            <div className="upload-area">
                                <input
                                    type="file"
                                    name="resume"
                                    id="resume"
                                    accept=".pdf,application/pdf"
                                    onChange={handleResumeChange}
                                    disabled={loading}
                                />

                                <label
                                    htmlFor="resume"
                                    className="upload-content"
                                >
                                    <div className="upload-icon">
                                        <svg
                                            width="26"
                                            height="26"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 16V4" />
                                            <path d="m7 9 5-5 5 5" />
                                            <path d="M20 16.5v3A1.5 1.5 0 0 1 18.5 21h-13A1.5 1.5 0 0 1 4 19.5v-3" />
                                        </svg>
                                    </div>

                                    <div>
                                        <strong>
                                            {resumeFile
                                                ? resumeFile.name
                                                : "Choose a PDF file"}
                                        </strong>

                                        <span>
                                            {resumeFile
                                                ? `${(resumeFile.size / (1024 * 1024)).toFixed(2)} MB`
                                                : "Click to browse your files"}
                                        </span>
                                    </div>
                                </label>
                            </div>

                            <span className="input-caption">
                                Supported format: PDF (Maximum size: 5 MB)
                            </span>
                        </div>

                        {/* Self description */}
                        <div className="input-group self-description-group">
                            <label htmlFor="selfDescription">
                                Self description
                            </label>

                            <textarea
                                name="selfDescription"
                                id="selfDescription"
                                placeholder="Describe your skills, experience, projects and career goals..."
                                value={selfDescription}
                                onChange={(e) => setSelfDescription(e.target.value)}
                                required
                            />
                        </div>

                        {/* Information hint */}
                        <div className="form-hint">
                            <span className="hint-icon">✦</span>

                            <p>
                                Use your resume and self-description together
                                for the best results.
                            </p>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="form-error" role="alert">
                                {error}
                            </div>
                        )}

                        {/* Generate report */}
                        <button
                            className="generate-btn"
                            type="submit"
                            disabled={loading}
                        >
                            <span>
                                {loading
                                    ? "Generating your report..."
                                    : "Generate interview report"}
                            </span>

                            {!loading && (
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            )}
                        </button>

                        <p className="privacy-note">
                            Your career journey deserves a better beginning.
                        </p>
                    </section>
                </form>

                {/* Footer */}
                <footer className="home-footer">
                    <span>Designed for your next big opportunity.</span>
                </footer>
            </div>
        </main>
    );
};

export default Home;
