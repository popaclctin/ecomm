const express = require("express");
const bodyParser = require("body-parser");
const usersRepo = require("./repositories/users.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`<div>
                <form method="POST">
                    <input name="email" placeholder="email" />
                    <input name="password" placeholder="password" />
                    <input name="confirmPassword" placeholder="confirm password" />
                    <button>Sign Up</button>
                </form>
            </div>`);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Account created");
});

app.listen(8888, () => {
  console.log("Listening...");
});
