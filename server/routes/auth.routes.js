const Router = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const router = new Router();

// http://localhost:3000/api/auth/registration =>
// POST + Body + raw + JSON =>
// {"email":"t@mail.com","password":"pass"}
router.post(
  "/registration",
  [
    check("email", "Incorrect email").isEmail(),
    check(
      "password",
      "Password must be longer than 3 and shorter than 12"
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Incorrect request", errors });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        console.log(`User with email ${email} already exists`);
        return res
          .status(400)
          .json({ message: `User with email ${email} already exists` });
      }
      const hashPassword = await bcrypt.hash(password, 15);
      const user = new User({ email, password: hashPassword });
      await user.save();
      return res.json({ message: "User was created successfully " });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  }
);

module.exports = router;
