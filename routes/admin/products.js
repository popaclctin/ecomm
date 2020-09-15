const express = require("express");
const multer = require("multer");

const productsNewTemplate = require("../../views/admin/products/new");
const productsIndexTemplate = require("../../views/admin/products/index");
const productsRepo = require("../../repositories/products");
const { requireTitle, requirePrice } = require("./validators");
const { handleErrors } = require("./middlewares");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", async (req, res) => {
  const products = await productsRepo.getAll();
  res.send(productsIndexTemplate({ products }));
});

router.get("/admin/products/new", (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post(
  "/admin/products/new",
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),
  (req, res) => {
    const image = req.file ? req.file.buffer.toString("base64") : null;
    const { title, price } = req.body;
    productsRepo.create({ title, price, image });
    res.send("Submitted");
  }
);

module.exports = router;
