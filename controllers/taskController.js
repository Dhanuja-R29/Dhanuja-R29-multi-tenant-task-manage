const Task = require("../models/Task");
const Audit = require("../models/AuditLog");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || "pending",
      createdBy: req.user.id,
      organization: req.user.organization,
    });

    await Audit.create({
      task: task._id,
      action: "CREATE",
      performedBy: req.user.id,
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//GET TASKS
exports.getTasks = async (req, res) => {
  try {
    let filter = {
      organization: req.user.organization,
    };

    // If member → only their tasks
    if (req.user.role !== "admin") {
      filter.createdBy = req.user.id;
    }

    const tasks = await Task.find(filter);

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Tenant check
    if (task.organization.toString() !== req.user.organization) {
      return res.status(403).json({ msg: "Forbidden" });
    }

    // RBAC check
    if (
      req.user.role !== "admin" &&
      task.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    await task.save();

    await Audit.create({
      task: task._id,
      action: "UPDATE",
      performedBy: req.user.id,
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Tenant check
    if (task.organization.toString() !== req.user.organization) {
      return res.status(403).json({ msg: "Forbidden" });
    }

    // RBAC + Ownership check
    if (
      req.user.role !== "admin" &&
      task.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    await task.deleteOne();

    await Audit.create({
      task: task._id,
      action: "DELETE",
      performedBy: req.user.id,
    });

    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
