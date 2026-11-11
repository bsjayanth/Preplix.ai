
import { useState } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";
import "../style/home.scss";

/**
 * @description Displays the interview preparation form and handles
 * AI-powered interview report generation.
 */
const Home = () => {
    const navigate = useNavigate();

    const { generateReport, loading } = useInterview();

    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resumeFile, setResumeFile] = useState(null);
    const [error, setError] = useState("");

    /**
     * @description Validates and stores the uploaded resume PDF.
     */
    const handleResumeChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            setResumeFile(null);
            return;
        }

        if (file.type !== "application/pdf") {
            setError("Please upload your resume in PDF format.");
            setResumeFile(null);
            event.target.value = "";
            return;
        }

        if (file.size > 3 * 1024 * 1024) {
            setError("Resume size should not exceed 3 MB.");
            setResumeFile(null);
            event.target.value = "";
            return;
        }

        setError("");
        setResumeFile(file);
    };

    /**
     * @description Validates the form, generates an AI interview report,
     * and navigates to the generated report.
     */
    const handleGenerateReport = async () => {
        setError("");

        if (!jobDescription.trim()) {
            setError("Please enter the job description.");
            return;
        }

        if (!selfDescription.trim()) {
            setError("Please enter your self description.");
            return;
        }

        if (!resumeFile) {
            setError("Please upload your resume.");
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
                    "The generated report ID was not returned."
                );
            }

            navigate(`/interview/${interviewId}`);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Something went wrong while generating your report."
            );
        }
    };

    return (
        <main className="home">
            <div className="home-container">

                <header className="home-header">
                    <div className="brand-name">
                        Preplix<span>.ai</span>
                    </div>

                    <h1 className="brand-tagline">
                        Prepare smarter.
                        <br />
                        <span>Stand out.</span>
                    </h1>

                    <p className="header-description">
                        Turn your resume and career goals into a personalised
                        interview preparation experience powered by AI.
                    </p>

                    <span className="brand-caption">
                        YOUR AI-POWERED INTERVIEW PREPARATION PARTNER
                    </span>
                </header>

                <section className="interview-input-group">

                    <div className="input-card">
                        <div className="card-heading">
                            <div className="heading-icon">
                                <span>01</span>
                            </div>

                            <div>
                                <h2>Job Description</h2>
                                <p>
                                    Tell us about the role you're targeting.
                                </p>
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="job-description">
                                Target Job Description
                            </label>

                            <textarea
                                id="job-description"
                                placeholder="Paste the complete job description here..."
                                value={jobDescription}
                                onChange={(event) =>
                                    setJobDescription(event.target.value)
                                }
                            />

                            <span className="input-caption">
                                Include responsibilities, requirements,
                                qualifications and preferred skills.
                            </span>
                        </div>
                    </div>

                    <div className="input-card">
                        <div className="card-heading">
                            <div className="heading-icon">
                                <span>02</span>
                            </div>

                            <div>
                                <h2>Your Profile</h2>
                                <p>
                                    Share your background and experience.
                                </p>
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="resume-upload">
                                Upload Your Resume
                            </label>

                            <div className="upload-area">
                                <input
                                    id="resume-upload"
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    onChange={handleResumeChange}
                                />

                                <label
                                    htmlFor="resume-upload"
                                    className="upload-content"
                                >
                                    <div className="upload-icon">
                                        <svg
                                            width="22"
                                            height="22"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 16V4" />
                                            <path d="m7 9 5-5 5 5" />
                                            <path d="M20 16.5v2A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5v-2" />
                                        </svg>
                                    </div>

                                    <div>
                                        <strong>
                                            {resumeFile
                                                ? resumeFile.name
                                                : "Choose your resume"}
                                        </strong>

                                        <span>
                                            PDF format · Maximum 3 MB
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="input-group self-description-group">
                            <label htmlFor="self-description">
                                Self Description
                            </label>

                            <textarea
                                id="self-description"
                                placeholder="Introduce yourself, your technical skills, projects, experience, achievements and career goals..."
                                value={selfDescription}
                                onChange={(event) =>
                                    setSelfDescription(event.target.value)
                                }
                            />

                            <span className="input-caption">
                                Describe your background, strengths and
                                professional experience.
                            </span>
                        </div>

                        <div className="form-hint">
                            <span className="hint-icon">ⓘ</span>

                            <p>
                                Use your resume and self description together
                                for the best results. This helps generate
                                interview questions that better reflect your
                                experience and skills.
                            </p>
                        </div>

                        {error && (
                            <div className="form-error" role="alert">
                                {error}
                            </div>
                        )}

                        <button
                            type="button"
                            className="generate-btn"
                            onClick={handleGenerateReport}
                            disabled={loading}
                        >
                            <span>
                                {loading
                                    ? "Generating your report..."
                                    : "Generate Interview Report"}
                            </span>

                            {!loading && (
                                <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            )}
                        </button>

                        <p className="privacy-note">
                            Your information is securely processed to
                            generate your personalised interview report.
                        </p>
                    </div>

                </section>

                <footer className="home-footer">
                    <span>
                        © 2026 Preplix.ai · Prepare smarter. Stand out.
                    </span>
                </footer>

            </div>

            {loading && (
                <div
                    className="generation-overlay"
                    role="status"
                    aria-live="polite"
                >
                    <div className="generation-card">
                        <div className="generation-spinner"></div>

                        <span className="generation-eyebrow">
                            PREPLIX.AI
                        </span>

                        <h2>Preparing your interview report</h2>

                        <p>
                            Analysing your resume, evaluating your skills
                            and generating personalised interview questions.
                        </p>

                        <div className="generation-progress">
                            <span></span>
                        </div>

                        <span className="generation-note">
                            This may take a few moments. Please don't
                            close or refresh this page.
                        </span>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Home;
