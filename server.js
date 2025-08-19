const express = require("express");
const mongoose = require("mongoose");

const ProductRoute = require("./route/product");

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

app.use("/products", ProductRoute);

app.listen(5123, () => {
    console.log("server is running at http://localhost:5123");
});