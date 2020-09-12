const express = require("express");
const bodyParser = require("body-parser");
const usersRepo = require("./repositories/users.js");
const cookieSession = require("cookie-session");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["asdajdn2i22"],
  })
);

app.get("/signup", (req, res) => {
  res.send(`<div>
  The user id is: ${req.session.userId}
                <form method="POST">
                    <input name="email" placeholder="email" />
                    <input name="password" placeholder="password" />
                    <input name="confirmPassword" placeholder="confirm password" />
                    <button>Sign Up</button>
                </form>
            </div>`);
});

app.post("/signup", async (req, res) => {
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

app.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

app.get("/signin", (req, res) => {
  res.send(`<div>
                <form method="POST">
                    <input name="email" placeholder="email" />
                    <input name="password" placeholder="password" />
                    <button>Sign In</button>
                </form>
            </div>`);
});

app.post("/signin", async (req, res) => {
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

app.listen(8888, () => {
  console.log("Listening on port 8888...");
});
