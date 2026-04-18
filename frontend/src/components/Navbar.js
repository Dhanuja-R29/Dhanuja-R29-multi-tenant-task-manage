import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div style={{ padding: "10px", background: "#eee" }}>
            <span>Task Manager</span>

            <button style={{ float: "right" }} onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Navbar;