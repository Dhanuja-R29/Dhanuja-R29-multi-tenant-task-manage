const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ["admin", "member"],
        default: "member"
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization"
    }
});

module.exports = mongoose.model("User", userSchema);