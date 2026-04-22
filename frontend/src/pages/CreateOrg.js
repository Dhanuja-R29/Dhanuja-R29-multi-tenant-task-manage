import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./CreateOrg.css";

function CreateOrg() {
    const [form, setForm] = useState({
        userName: "",
        email: "",
        password: "",
        organization: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        const { userName, email, password, organization } = form;

        if (!userName || !email || !password || !organization) {
            toast.error("Please fill all fields ❌");
            return;
        }

        try {
            setLoading(true);

            const res = await API.post("/org/create", {
                name: organization,
                userName,
                email,
                password
            });

            toast.success("Org Created 🎉 ID: " + res.data.orgId);

            // 🔥 OPTIONAL: auto redirect to login
            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (err) {
            toast.error(err.response?.data?.msg || "Failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="org-container">
            <div className="org-box">
                <h2>Create Organization 🚀</h2>

                <input
                    name="userName"
                    placeholder="Your Name"
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
                    placeholder="Organization Name"
                    onChange={handleChange}
                />

                <button onClick={handleCreate} disabled={loading}>
                    {loading ? "Creating..." : "Create Organization"}
                </button>
            </div>
        </div>
    );
}

export default CreateOrg;