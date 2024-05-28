const express = require("express");
const router = express.Router();
const user = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const jwtsec = "MynameisYashanpalSingh";

// For signup
router.post(
  "/CreateUser",
  [
    body("email").isEmail().custom((value) => {
      if (!value.endsWith(".com")) {
        throw new Error("Email must end with '.com'");
      }
      return true;
    }),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      // Check if the user with the provided email already exists
      const existingUser = await user.findOne({ email: req.body.email });

      if (existingUser) {
        return res.status(400).json({ errors: "User already exists" });
      }

      if (!req.body.email.toLowerCase().endsWith(".com")) {
        return res
          .status(400)
          .json({ errors: "Email must end with '.com'" });
      }

      const salt = await bcrypt.genSalt(10);
      const secpassword = await bcrypt.hash(req.body.password, salt);

      await user.create({
        name: req.body.name,
        password: secpassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (err) {
      console.log("error");
      res.json({ success: false });
    }
  }
);

//For existing User
router.post(
  "/LoginUser",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await user.findOne({ email });
      if (!userData) {
        return res.status(400).json({
          errors: "Your email is not registered ,Please Sign Up First",
        });
      }
      const pwdcompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!pwdcompare) {
        return res.status(400).json({ errors: "Incorrect Password" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authtoken = jwt.sign(data, jwtsec);

      return res.json({ success: true, authtoken: authtoken });
    } catch (err) {
      console.log("error");
      res.json({ success: false });
    }
  }
);

module.exports = router;
