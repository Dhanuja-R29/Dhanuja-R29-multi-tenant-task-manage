const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {

    // ✅ EXISTING USER
    if (!req.user.isNewUser) {
      const token = jwt.sign(
        {
          id: req.user._id,
          role: req.user.role,
          organization: req.user.organization,
        },
        process.env.JWT_SECRET
      );

      return res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
    }

    // ❗ NEW USER → NEED ORG
    return res.redirect(
      `http://localhost:3000/select-org?email=${req.user.email}&name=${req.user.name}`
    );
  }
);
module.exports = router;