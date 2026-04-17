const Audit = require("../models/AuditLog");

exports.getLogs = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ msg: "Access denied" });
        }
        const logs = await Audit.find()
        .populate({
            path: "task",
            match: { organization: req.user.organization },
            select: "title status organization"
        })
        .populate("performedBy", "name email");
        // Remove logs where task is null
        const filteredLogs = logs.filter(log => log.task);
        res.json(filteredLogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};