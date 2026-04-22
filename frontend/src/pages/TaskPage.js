import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function TasksPage({ tasks, fetchTasks }) {
    return (
        <div>
            <h1>Tasks 📋</h1>

            <TaskForm fetchTasks={fetchTasks} />

            <TaskList tasks={tasks} fetchTasks={fetchTasks} />
        </div>
    );
}

export default TasksPage;