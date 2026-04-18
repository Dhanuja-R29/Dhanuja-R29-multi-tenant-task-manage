import { useState } from "react";
import API from "../services/api";

function CreateOrg() {
    const [name, setName] = useState("");

    const handleCreate = async () => {
        const res = await API.post("/org/create", { name });

        alert("Org Created: " + res.data._id);
    };

    return (
        <div>
            <h2>Create Organization</h2>

            <input
                placeholder="Org Name"
                onChange={(e) => setName(e.target.value)}
            />

            <button onClick={handleCreate}>Create</button>
        </div>
    );
}

export default CreateOrg;