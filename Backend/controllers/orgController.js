const Organization = require("../models/Organization");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createOrg = async (req, res) => {
    try {
        const { name, email, password, userName } = req.body;

        if (!name || !email || !password || !userName) {
            return res.status(400).json({ msg: "All fields required" });
        }
        const existingOrg = await Organization.findOne({ name });
        if (existingOrg) {
            return res.status(400).json({ msg: "Organization name already taken" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists with this email" });
        }

        const org = await Organization.create({ name });

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new User({
            name: userName,
            email,
            password: hashedPassword,
            organization: org._id,
            role: "admin"
        });

        await admin.save();
        
        res.status(201).json({
            msg: "Organization + Admin created",
            orgId: org._id
        });

    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};