import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

import DashboardOverview from "./DashboardOverview";
import TaskPage from "./TaskPage";
import ProfilePage from "./ProfilePage";
import AuditPage from "./AuditPage";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const location = useLocation();

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

  // 🔥 CLEAN ROUTING LOGIC
  const renderPage = () => {
    switch (location.pathname) {
      case "/tasks":
        return <TaskPage tasks={tasks} fetchTasks={fetchTasks} />;

      case "/profile":
        return <ProfilePage />;

      case "/audit":
        return <AuditPage />;

      case "/dashboard":
      default:
        return <DashboardOverview tasks={tasks} />;
    }
  };

  return (
    <div className="dashboard">
      {/* 🔥 Sidebar */}
      <Sidebar />

      {/* 🔥 Main Area */}
      <div className="main">
        {/* 🔥 Top Navbar */}
        <Navbar />

        {/* 🔥 Dynamic Content */}
        <div className="content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;