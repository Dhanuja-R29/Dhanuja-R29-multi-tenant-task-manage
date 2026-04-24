import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

function SelectOrg() {
  const [orgId, setOrgId] = useState("");
  const navigate = useNavigate();

  const query = new URLSearchParams(useLocation().search);
  const email = query.get("email");
  const name = query.get("name");

  const handleJoin = async () => {
    try {
      const res = await API.post("/auth/oauth-register", {
        name,
        email,
        organization: orgId,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid Org ID ❌");
    }
  };

  return (
    <div>
      <h2>Join Organization</h2>
      <p>{email}</p>

      <input
        placeholder="Enter Organization ID"
        onChange={(e) => setOrgId(e.target.value)}
      />

      <button onClick={handleJoin}>Join</button>
    </div>
  );
}

export default SelectOrg;