const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");
const adminProductRouter = require("./routes/admin/products");
const productRouter = require("./routes/products");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["asdajdn2i22"],
  })
);
app.use(authRouter);
app.use(productRouter);
app.use(adminProductRouter);

app.listen(8888, () => {
  console.log("Listening on port 8888...");
});
