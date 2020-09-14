const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["asdajdn2i22"],
  })
);
app.use(authRouter);

app.listen(8888, () => {
  console.log("Listening on port 8888...");
});
