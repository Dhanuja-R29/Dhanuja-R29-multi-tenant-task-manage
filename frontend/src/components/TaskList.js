import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function TaskList({ tasks, fetchTasks }) {
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({
        title: "",
        description: "",
        status: "pending"
    });

    const { user } = useContext(AuthContext);

    const handleDelete = async (id) => {
        try {
            await API.delete(`/tasks/${id}`);
            alert("Task Deleted ✅");
            fetchTasks();
        } catch (err) {
            alert(err.response?.data?.msg || "Delete not allowed ❌");
        }
    };

    const startEdit = (task) => {
        setEditId(task._id);
        setEditData({
            title: task.title,
            description: task.description,
            status: task.status
        });
    };

    const handleUpdate = async (id) => {
        try {
            await API.put(`/tasks/${id}`, editData);
            alert("Task Updated ✅");
            setEditId(null);
            fetchTasks();
        } catch (err) {
            alert(err.response?.data?.msg || "Update failed ❌");
        }
    };

    return (
        <div>
            <h3>Your Tasks</h3>

            {tasks.map((task) => {
                const isOwner = task.createdBy === user?.id;
                const isAdmin = user?.role === "admin";

                return (
                    <div
                        key={task._id}
                        style={{
                            border: "1px solid #ccc",
                            margin: "10px",
                            padding: "10px",
                            borderRadius: "8px"
                        }}
                    >
                        {editId === task._id ? (
                            <>
                                <input
                                    value={editData.title}
                                    onChange={(e) =>
                                        setEditData({ ...editData, title: e.target.value })
                                    }
                                />

                                <input
                                    value={editData.description}
                                    onChange={(e) =>
                                        setEditData({ ...editData, description: e.target.value })
                                    }
                                />

                                <select
                                    value={editData.status}
                                    onChange={(e) =>
                                        setEditData({ ...editData, status: e.target.value })
                                    }
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>

                                <button onClick={() => handleUpdate(task._id)}>
                                    Save
                                </button>

                                <button onClick={() => setEditId(null)}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <h4>{task.title}</h4>
                                <p>{task.description}</p>
                                <p>
                                    Status: <b>{task.status}</b>
                                </p>

                                {/* 🔐 RBAC LOGIC */}
                                {(isAdmin || isOwner) && (
                                    <>
                                        <button onClick={() => startEdit(task)}>
                                            Edit
                                        </button>

                                        <button onClick={() => handleDelete(task._id)}>
                                            Delete
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default TaskList;