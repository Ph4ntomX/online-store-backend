let Controller = {}

const axios = require("axios");

const Order = require("../models/order");

Controller.getOrders = async () => {
  const orders = await Order.find().sort({ _id: -1 });
  return orders;
};

Controller.getOrder = async (id) => {
  const order = await Order.findOne({ billplz_id: id });
  return order;
};

Controller.addNewOrder = async (customerName, customerEmail, products, totalPrice) => {
  // 1. create a new bill in billplz

  const description = products.map((product) => `${product.name} x ${product.quantity}`).join(", ");

  const billplzResponse = await axios.post(
    process.env.BILLPLZ_API_URL + "v3/bills",
    {
      collection_id: process.env.BILLPLZ_COLLECTION_ID,
      description: description,
      name: customerName,
      email: customerEmail,
      amount: parseFloat(totalPrice) * 100, // convert to cent
      callback_url: process.env.FRONTEND_URL + "verify-payment",
      redirect_url: process.env.FRONTEND_URL + "verify-payment",
    },
    {
      auth: {
        username: process.env.BILLPLZ_API_KEY,
        password: "",
      },
    }
  );

  // 2. extract id and billplz url from the billplzResponse
  const billplz_id = billplzResponse.data.id;
  const billplz_url = billplzResponse.data.url;

  // 3. create new order in mongodb
  const newOrder = new Order({
    customerName,
    customerEmail,
    products,
    totalPrice,
    billplz_id: billplz_id,
  });
  await newOrder.save();

  // 4. return the order with the billplz url
  return {
    ...newOrder,
    billplz_url: billplz_url,
  };
};

Controller.updateOrder = async (id, status) => {
  const orderById = await Order.findOne({ billplz_id: id });

  if (orderById && orderById.status == "pending") {
    throw new Error("Order still pending");
  }

  const updatedOrder = await Order.findOneAndUpdate(
    { billplz_id: id },
    {
      status: status,
    },
    {
      new: true,
    }
  );
  return updatedOrder;
};

Controller.deleteOrder = async (id) => {
  const orderById = await Order.findOne({ billplz_id: id });

  if (orderById && orderById.status !== "pending") {
    throw new Error("Order is not pending");
  }

  return await Order.findOneAndDelete({ billplz_id: id });
};

module.exports = Controller;