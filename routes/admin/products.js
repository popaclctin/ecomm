const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const productsNewTemplate = require("../../views/admin/products/new");
const productsRepo = require("../../repositories/products");

const { requireTitle, requirePrice } = require("./validators");

router.get("/admin/products", (req, res) => {});

router.get("/admin/products/new", (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post("/admin/products/new", [requireTitle, requirePrice], (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  res.send("Submitted");
});

module.exports = router;
