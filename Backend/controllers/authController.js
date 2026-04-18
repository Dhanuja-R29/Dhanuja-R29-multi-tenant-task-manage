const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Organization = require("../models/Organization");

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password, organization } = req.body;

        // Check org exists
        const org = await Organization.findById(organization);
        if (!org) {
            return res.status(400).json({ msg: "Invalid organization" });
        }

        // Check if user exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);

        // Check if first user → admin
        const existingUsers = await User.countDocuments({ organization });

        const user = await User.create({
            name,
            email,
            password: hashed,
            organization,
            role: existingUsers === 0 ? "admin" : "member"
        });

        res.json({ msg: "User registered", user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // JWT token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                organization: user.organization
            },
            process.env.JWT_SECRET,
            { expiresIn: "5h" }
        );

        res.json({ msg: "Login successful", token });

    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ msg: "Token expired" });
        }
        return res.status(401).json({ msg: "Invalid token" });
    }
};