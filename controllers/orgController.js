const Organization = require("../models/Organization");

// Create organization
exports.createOrg = async (req, res) => {
    try {
        const { name } = req.body;

        const org = await Organization.create({ name });

        res.json(org);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};