import { useNavigate, useLocation } from "react-router-dom";
import "./Bar.css";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="sidebar">
            <h3>Menu</h3>

            <p 
                className={location.pathname === "/dashboard" ? "active" : ""}
                onClick={() => navigate("/dashboard")}
            >
                Dashboard
            </p>

            <p 
                className={location.pathname === "/tasks" ? "active" : ""}
                onClick={() => navigate("/tasks")}
            >
                Tasks
            </p>

            <p 
                className={location.pathname === "/profile" ? "active" : ""}
                onClick={() => navigate("/profile")}
            >
                Profile
            </p>
        </div>
    );
}

export default Sidebar;