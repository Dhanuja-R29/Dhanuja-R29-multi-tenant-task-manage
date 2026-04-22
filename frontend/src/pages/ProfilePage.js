import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function ProfilePage() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="profile-container">
            <div className="profile-card">

                <div className="avatar">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>

                <h2>{user?.name}</h2>

                <p className="email">{user?.email}</p>

                <p className="role">
                    Role: <span>{user?.role}</span>
                </p>

                {user?.role === "admin" && (
                    <button className="audit-btn" onClick={() => navigate("/audit")}>
                        View Audit Logs 🔐
                    </button>
                )}

            </div>
        </div>
    );
}

export default ProfilePage;