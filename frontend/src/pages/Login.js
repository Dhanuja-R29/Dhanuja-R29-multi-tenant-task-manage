import { useState, useContext } from "react";
import API from "../services/api";
import "./Login.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      login(res.data.token);
      navigate("/dashboard");

      alert("Login Successful ✅");

    } catch (err) {
      console.log("ERROR:", err.response);
      alert(err.response?.data?.msg || "Login Failed ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        {/* 🔥 REGISTER LINK */}
        <p
          onClick={() => navigate("/register")}
          style={{
            marginTop: "15px",
            cursor: "pointer",
            color: "#667eea",
            fontSize: "14px"
          }}
        >
          New user? Register here
        </p>
        <p onClick={() => navigate("/create-org")}
        style={{
          marginTop: "10px",
          cursor: "pointer",
          color: "#667eea",
          fontSize: "14px"
          }}
          >
            Create Organization
          </p>
      </div>
    </div>
  );
}

export default Login;