import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "./TaskList.css";
import "./TaskForm.css";
import {toast} from "react-toastify";

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
            toast.success("Task Deleted ✅");
            fetchTasks();
        } catch (err) {
            toast.delete("Delete not allowed ❌");
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
            toast.success("Task Updated ✅");
            setEditId(null);
            fetchTasks();
        } catch (err) {
            toast.error("Update failed ❌");
        }
    };

    return (
    <div>
        <h3>Your Tasks</h3>

        <div className="task-container">
            {tasks.map((task) => {
                const isOwner = task.createdBy === user?.id;
                const isAdmin = user?.role === "admin";

                return (
                    <div className="task-card" key={task._id}>

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

                                <div className="task-actions">
                                    <button onClick={() => handleUpdate(task._id)}>
                                        Save
                                    </button>

                                    <button onClick={() => setEditId(null)}>
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* 🔥 HEADER */}
                                <div className="task-header">
                                    <h4>{task.title}</h4>

                                    <span className={`status ${task.status}`}>
                                        {task.status}
                                    </span>
                                </div>

                                {/* 🔥 DESCRIPTION */}
                                <p>{task.description}</p>

                                {/* 🔥 ACTIONS (RBAC) */}
                                {(isAdmin || isOwner) && (
                                    <div className="task-actions">
                                        <button onClick={() => startEdit(task)}>
                                            Edit
                                        </button>

                                        <button onClick={() => handleDelete(task._id)}>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    </div>
    );
}

export default TaskList;