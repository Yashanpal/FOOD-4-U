const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsec = "MynameisYashanpalSingh";
// Define the route for admin login
router.post("/admin", async (req, res) => {
  const { email, password } = req.body;

  // Check if the provided email and password match admin credentials
  if (email === "yashanpal143@gmail.com" && password === "YashanCse6^") {
    try {
      // Generate a token for admin
      const data = {
        admin: true,
        email: email
      };
      const authtoken = jwt.sign(data, jwtsec);
      
      // Return success response with the generated token
      res.json({ success: true, authtoken: authtoken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  } else {
    // Return error response indicating no admin found
    res.status(401).json({ success: false, message: "No admin found" });
  }
});

module.exports = router;
