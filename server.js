const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ProductRoute = require("./route/product");
const OrderRoute = require("./route/order");
const PaymentRoute = require("./route/payment");
const CategoryRoute = require("./route/category");

require("dotenv").config();

const app = express();

async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/online-store");
    console.log("MongoDB is Connected");
  } catch (error) {
    console.log(error);
  }
}

connectToMongoDB();


app.get("/", (req, res) => {
    res.send("Welcome to the Online Store API");
})

app.use(cors());
app.use(express.json());
app.use("/products", ProductRoute);
app.use("/orders", OrderRoute);
app.use("/payment", PaymentRoute);
app.use("/categories", CategoryRoute);

app.listen(5123, () => {
    console.log("server is running at http://localhost:5123");
});