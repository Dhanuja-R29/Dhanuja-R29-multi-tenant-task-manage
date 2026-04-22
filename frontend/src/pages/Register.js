import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { toast } from "react-toastify";

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        organization: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        const { name, email, password, organization } = form;

        if (!name || !email || !password || !organization) {
            toast.error("Please fill all fields ❌");
            return;
        }

        try {
            setLoading(true);

            await API.post("/auth/register", form);

            toast.success("Registered Successfully 🎉");

            setTimeout(() => {
                navigate("/");
            }, 1200);

        } catch (err) {
            toast.error(err.response?.data?.msg || "Registration failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="bg-circle circle1"></div>
            <div className="bg-circle circle2"></div>
            <div className="bg-circle circle3"></div>
            <div className="register-box">
                <h2>Create Account 🚀</h2>

                <input 
                    name="name" 
                    placeholder="Full Name" 
                    onChange={handleChange} 
                />

                <input 
                    name="email" 
                    placeholder="Email" 
                    onChange={handleChange} 
                />

                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                />

                <input 
                    name="organization" 
                    placeholder="Organization ID" 
                    onChange={handleChange} 
                />

                <p className="helper-text">
                    Enter Organization ID provided by admin
                </p>

                <button onClick={handleRegister} disabled={loading}>
                    {loading ? "Creating..." : "Register"}
                </button>

                <p onClick={() => navigate("/")} className="link">
                    Already have an account? Login
                </p>
            </div>
        </div>
    );
}

export default Register;