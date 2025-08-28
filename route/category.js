const express = require("express");
const router = express.Router();

const Controller = require("../controllers/category");

router.get("/", async (req, res) => {
    try {
        const categories = await Controller.getCategories();
        res.status(200).send(categories);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Unknown error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Controller.getCategory(id);
        res.status(200).send(category);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Unknown error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const name = req.body.name;
        const category = await Controller.addNewCategory(name);
        res.status(200).send(category);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Unknown error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const category = await Controller.updateCategory(id, name);
        res.status(200).send(category);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Unknown error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Controller.deleteCategory(id);
        res.status(200).send(category);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Unknown error" });
    }
});

module.exports = router;
