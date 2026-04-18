const express = require("express");
const router = express.Router();
const orgController = require("../controllers/orgController");

router.post("/create", orgController.createOrg);

module.exports = router;