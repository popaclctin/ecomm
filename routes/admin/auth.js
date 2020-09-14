const usersRepo = require("../../repositories/users");
const express = require("express");
const router = express.Router();
const signinTemplate = require("../../views/admin/auth/signin");
const signupTemplate = require("../../views/admin/auth/signup");
const { check, validationResult } = require("express-validator");
const {
  requireEmail,
  requirePassword,
  requireConfirmPassword,
  requireEmailExists,
  requireValidPasswordForUser,
} = require("./validators");

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, requireConfirmPassword],
  async (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
      return res.send(signupTemplate({ req, errors }));
    }

    const user = await usersRepo.create({ email, password });
    req.session.userId = user.id;
    res.send("Account created");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

router.get("/signin", (req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  "/signin",
  [requireEmailExists, requireValidPasswordForUser],
  async (req, res) => {
    const { email } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(signinTemplate({ errors }));
    }

    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.id;

    res.send("You are signed in");
  }
);

module.exports = router;
