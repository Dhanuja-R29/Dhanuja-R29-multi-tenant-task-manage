import { useEffect, useState } from "react";
import API from "../services/api";
import "./Audit.css";

function AuditPage() {
    const [logs, setLogs] = useState([]);

    const fetchLogs = async () => {
        try {
            const res = await API.get("/audit");
            setLogs(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <div className="audit-container">
            <h1>Audit Logs 🔐</h1>

            {logs.length === 0 ? (
                <p>No logs available</p>
            ) : (
                logs.map((log) => (
                    <div key={log._id} className="audit-card">

                        <div className="audit-header">
                            <span className={`badge ${log.action.toLowerCase()}`}>
                                {log.action}
                            </span>

                            <span className="time">
                                {new Date(log.timestamp).toLocaleString()}
                            </span>
                        </div>

                        <p><b>Task:</b> {log.task?.title}</p>

                        <p>
                            <b>Performed By:</b>{" "}
                            {log.performedBy?.name || "System"}
                        </p>

                    </div>
                ))
            )}
        </div>
    );
}

export default AuditPage;