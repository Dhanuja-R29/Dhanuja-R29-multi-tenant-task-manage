const mongoose = require("mongoose");

const orgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Organization", orgSchema);