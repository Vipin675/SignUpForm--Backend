const express = require("express");
const User = require("../model/user");
const router = express.Router();

// validator
const { body, validationResult } = require("express-validator");

// CREATE NEW USER :-
router.post(
  "/new-user",
  [
    body("name", body("name")).isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],

  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success: false,
          message: "user with this email already exists",
        });
      }

      user = await User.create(req.body);

      res.json({
        success: true,
        message: "User created",
        user,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error");
    }
  }
);

//LOGIN EXISTING USER :- Authenticate user http://localhost:8080/api/auth/login
router.post(
  "/login",
  [
    body("email").isEmail(), //VALIDATORS USINTG express-validators
    body("password", "Password can't be blank").exists(),
  ],
  async (req, res) => {
    // express validators
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: "Incorrect email or password" });
      }

      if (password != user.password) {
        return res
          .status(400)
          .json({ success: false, error: "Incorrect email or password" });
      }

      res.json({
        success: true,
        message: `Welcome ${user.name}`,
        user,
      });
    } catch (error) {
      res.status(500).send("Internal Server error");
    }
  }
);

//GET ALL USERS :- http://localhost:8080/api/auth/get-all-users
router.get("/get-all-users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).send("Internal Server error");
  }
});

module.exports = router;
