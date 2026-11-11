
import { useAuth } from "../../auth/hooks/useAuth";
import "./../style/Profile.scss";

/**
 * @description Displays the currently authenticated user's account details.
 */
const Profile = () => {
    const { user } = useAuth();

    const username =
        user?.username ||
        user?.name ||
        user?.fullName ||
        "User";

    const email = user?.email || "Not available";

    return (
        <section className="profile-page">
            <header className="profile-page-header">
                <span className="profile-eyebrow">ACCOUNT SETTINGS</span>
                <h1>My Profile</h1>
                <p>View your account information and personal details.</p>
            </header>

            <div className="profile-card">
                <div className="profile-avatar">
                    {username.charAt(0).toUpperCase()}
                </div>

                <div className="profile-identity">
                    <h2>{username}</h2>
                    <p>{email}</p>
                </div>

                <div className="profile-divider"></div>

                <div className="profile-detail">
                    <span>Full Name</span>
                    <strong>{username}</strong>
                </div>

                <div className="profile-detail">
                    <span>Email Address</span>
                    <strong>{email}</strong>
                </div>

                <div className="profile-detail">
                    <span>Account Status</span>
                    <strong className="profile-status">
                        Active
                    </strong>
                </div>
            </div>
        </section>
    );
};

export default Profile;
