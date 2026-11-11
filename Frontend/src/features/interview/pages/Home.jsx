
import React from "react";
import { useNavigate } from "react-router";
import "../style/home.scss";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="home">

      <div className="home-container">

        {/* BRAND HEADER */}
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

        {/* INTERVIEW FORM */}
        <div className="interview-input-group">

          {/* JOB DESCRIPTION */}
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
            />

            <span className="input-caption">
              Include responsibilities, qualifications and requirements.
            </span>

          </section>

          {/* PROFILE SECTION */}
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

            {/* RESUME UPLOAD */}
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
                    <strong>Choose a PDF file</strong>
                    <span>Click to browse your files</span>
                  </div>

                </label>

              </div>

              <span className="input-caption">
                Supported format: PDF
              </span>

            </div>

            {/* SELF DESCRIPTION */}
            <div className="input-group self-description-group">

              <label htmlFor="selfDescription">
                Self description
              </label>

              <textarea
                name="selfDescription"
                id="selfDescription"
                placeholder="Describe your skills, experience, projects and career goals..."
              />

            </div>

            {/* INFORMATION HINT */}
            <div className="form-hint">

              <span className="hint-icon">✦</span>

              <p>
                Use your resume and self-description together
                for the best results.
              </p>

            </div>

            {/* GENERATE BUTTON */}
            <button
              className="generate-btn"
              type="button"
              onClick={() => navigate("/interview")}
            >

              <span>Generate interview report</span>

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

            </button>

            <p className="privacy-note">
              Your career journey deserves a better beginning.
            </p>

          </section>

        </div>

        {/* FOOTER */}
        <footer className="home-footer">
          <span>Designed for your next big opportunity.</span>
        </footer>

      </div>

    </main>
  );
};

export default Home;
