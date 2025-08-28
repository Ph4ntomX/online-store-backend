const express = require("express");

const router = express.Router();
const Controller = require("../controllers/product");

router.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    const page = req.query.page;
    const limit = req.query.limit;

    const products = await Controller.getProducts({category}, page, limit);

    if (!products) {
      return res.status(404).send("Products were not found");
    }
    
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Controller.getProductById(id);

    if (!product) {
      return res.status(404).send("Product was not found");
    }
    
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body)

    if (!req.body) {
      return res.status(400).send("No data provided");
    }

    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
        return res.status(400).send("All fields are required");
    }

    const product = await Controller.createProduct({ name, description, price, category });

    if (!product) {
      return res.status(404).send("Product was not created");
    }
    
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
})

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!req.body) {
      return res.status(400).send("No data provided");
    }
    
    const product = await Controller.updateProduct(id, req.body);

    if (!product) {
      return res.status(404).send("Product was not found and updated");
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Controller.deleteProduct(id);

    if (!product) {
      return res.status(404).send("Product was not found and deleted");
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router;