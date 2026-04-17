const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const authRoutes = require("./routes/authRoutes");
const orgRoutes = require("./routes/orgRoutes");
const taskRoutes = require("./routes/taskRoutes");
const auditRoutes = require("./routes/auditRoutes");

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/org", orgRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/audit", auditRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("API Running");
});

app.listen(5000, () => console.log("Server running on port 5000"));