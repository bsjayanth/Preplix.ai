
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../auth.form.scss";

const Login = () => {
    const navigate = useNavigate();
    const { loading, handleLogin } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /**
     * @description Handles login form submission and redirects the user after successful authentication.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await handleLogin({ email, password });
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-container">

                <header className="auth-header">
                    <Link to="/" className="auth-brand">
                        Preplix<span>.ai</span>
                    </Link>

                    <span className="auth-caption">
                        PREPARE SMARTER. STAND OUT.
                    </span>
                </header>

                <section className="auth-card">

                    <div className="auth-intro">
                        <span className="auth-eyebrow">
                            WELCOME BACK
                        </span>

                        <h1>
                            Sign in to your
                            <br />
                            <span>next opportunity.</span>
                        </h1>

                        <p>
                            Continue your interview preparation journey
                            and take the next step towards your career goals.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="auth-input-group">
                            <label htmlFor="email">
                                Email address
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="auth-submit-btn"
                            disabled={loading}
                        >
                            <span>
                                {loading ? "Signing in..." : "Sign in"}
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

                    </form>

                    <div className="auth-switch">
                        <p>
                            Don't have an account?
                            <Link to="/register"> Create an account</Link>
                        </p>
                    </div>

                </section>

                <footer className="auth-footer">
                    Designed for your next big opportunity.
                </footer>

            </div>
        </main>
    );
};

export default Login;
