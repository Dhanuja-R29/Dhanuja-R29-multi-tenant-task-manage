import { useState } from "react";
import API from "../services/api";

function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  const handleCreate = async () => {
    try {
      await API.post("/tasks", {
        title,
        description,
        status,
      });

      alert("Task Created ✅");

      setTitle("");
      setDescription("");

      fetchTasks(); // refresh list
    } catch (err) {
      alert("Error creating task");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Create Task</h3>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={handleCreate}>Add Task</button>
    </div>
  );
}

export default TaskForm;
