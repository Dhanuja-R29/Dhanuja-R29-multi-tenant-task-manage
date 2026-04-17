const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    },
    action: {
        type: String,
        enum: ["CREATE", "UPDATE", "DELETE"]
    },
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("AuditLog", auditSchema);