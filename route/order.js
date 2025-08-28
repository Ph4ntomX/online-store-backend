const express = require("express");
// set up order router
const router = express.Router();

const Controller = require("../controllers/order");

/*
    GET /orders
    GET /orders/:id
    POST /orders
    PUT /orders/:id
    DELETE /orders/:id
*/

// get orders
router.get("/", async (req, res) => {
  try {
    const orders = await Controller.getOrders();
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// get order
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Controller.getOrder(id);
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// create new order
router.post("/", async (req, res) => {
  try {
    const customerName = req.body.customerName;
    const customerEmail = req.body.customerEmail;
    const products = req.body.products;

    const totalPrice = products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    const newOrder = await Controller.addNewOrder(
      customerName,
      customerEmail,
      products,
      totalPrice
    );

    res.status(200).send(newOrder);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// update order
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    const updatedOrder = await Controller.updateOrder(id, status);
    res.status(200).send(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// delete order
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Controller.deleteOrder(id);
    res.status(200).send({
      message: `Order #${id} has been deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
