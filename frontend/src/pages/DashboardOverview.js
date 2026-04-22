function DashboardOverview({ tasks }) {

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "completed").length;
    const pending = tasks.filter(t => t.status === "pending").length;
    const inProgress = tasks.filter(t => t.status === "in-progress").length;

    return (
        <div className="dashboard-overview">
            <h1>Dashboard 🚀</h1>

            <div className="stats-grid">

                <div className="stat-card total">
                    <h2>{total}</h2>
                    <p>Total Tasks</p>
                </div>

                <div className="stat-card completed">
                    <h2>{completed}</h2>
                    <p>Completed</p>
                </div>

                <div className="stat-card pending">
                    <h2>{pending}</h2>
                    <p>Pending</p>
                </div>

                <div className="stat-card progress">
                    <h2>{inProgress}</h2>
                    <p>In Progress</p>
                </div>

            </div>
        </div>
    );
}

export default DashboardOverview;