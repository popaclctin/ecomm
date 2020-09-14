const usersRepo = require("../../repositories/users");
const express = require("express");
const router = express.Router();
const signinTemplate = require("../../views/admin/auth/signin");
const signupTemplate = require("../../views/admin/auth/signup");

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post("/signup", async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    res.send("Email is already in use");
  }

  if (password !== confirmPassword) {
    res.send("Passwords do not match");
  }

  const user = await usersRepo.create({ email, password });

  req.session.userId = user.id;

  res.send("Account created");
});

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

router.get("/signin", (req, res) => {
  res.send(signinTemplate());
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await usersRepo.getOneBy({ email });

  if (!existingUser) {
    res.send("Email not found");
  }

  const validPassword = await usersRepo.comparePasswords(
    existingUser.password,
    password
  );

  if (!validPassword) {
    res.send("Invalid password");
  }

  req.session.userId = existingUser.id;

  res.send("You are signed in");
});

module.exports = router;
