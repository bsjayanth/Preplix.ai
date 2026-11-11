
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../auth.form.scss";

const Register = () => {
    const navigate = useNavigate();
    const { loading, handleRegister } = useAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /**
     * @description Handles registration form submission and redirects the user after successful account creation.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await handleRegister({
                username,
                email,
                password
            });

            navigate("/");
        } catch (error) {
            console.error("Registration failed:", error);
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
                            GET STARTED
                        </span>

                        <h1>
                            Your next chapter
                            <br />
                            <span>starts here.</span>
                        </h1>

                        <p>
                            Create your account and get a personalised
                            interview preparation experience built around you.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="auth-input-group">
                            <label htmlFor="username">
                                Full name
                            </label>

                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your full name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

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
                                placeholder="Create a password"
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
                                {loading ? "Creating account..." : "Create account"}
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
                            Already have an account?
                            <Link to="/login"> Sign in</Link>
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

export default Register;
