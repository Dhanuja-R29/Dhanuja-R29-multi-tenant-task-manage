import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Bar.css";

function Navbar() {
    const { logout, user } = useContext(AuthContext);

    return (
        <div className="navbar">
            <h3>Task Manager 🚀</h3>

            <div>
                <span>{user?.name || "User"}</span>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    );
}

export default Navbar;