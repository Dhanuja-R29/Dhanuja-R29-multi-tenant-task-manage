import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Dashboard() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const res = await API.get("/tasks");
            setTasks(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <Navbar />

            <div style={{ padding: "20px" }}>
                <h1>Dashboard 🚀</h1>

                <TaskForm fetchTasks={fetchTasks} />

                <TaskList tasks={tasks} fetchTasks={fetchTasks} />
            </div>
        </div>
    );
}

export default Dashboard;