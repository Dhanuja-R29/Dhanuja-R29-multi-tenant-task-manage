import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const { user, loading } = useContext(AuthContext);

    // 🔥 WAIT until auth is ready
    if (loading) return <p>Loading...</p>;

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;