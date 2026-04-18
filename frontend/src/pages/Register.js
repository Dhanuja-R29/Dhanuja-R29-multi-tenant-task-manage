import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // reuse same style

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        organization: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        const { name, email, password, organization } = form;

        if (!name || !email || !password || !organization) {
            alert("Please fill all fields");
            return;
        }

        try {
            await API.post("/auth/register", form);
            alert("Registered Successfully ✅");

            navigate("/"); // go to login
        } catch (err) {
            alert(err.response?.data?.msg || "Registration failed ❌");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Register</h2>

                <input name="name" placeholder="Name" onChange={handleChange} />
                <input name="email" placeholder="Email" onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} />
                <input name="organization" placeholder="Organization ID" onChange={handleChange} />
                <p style={{ fontSize: "12px" }}>
                    Enter Organization ID (get from admin)
                </p>
                
                <button onClick={handleRegister}>Register</button>

                <p onClick={() => navigate("/")} style={{ cursor: "pointer", marginTop: "10px" }}>
                    Already have an account? Login
                </p>
            </div>
        </div>
    );
}

export default Register;