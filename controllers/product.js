let Controller = {}
const Product = require("../models/product");

Controller.getProducts = async (rawFilter, page = 1, limit = 10) => {
    // pagination implemented

    let filter = {};
    
    if (rawFilter.category) {
      filter.category = rawFilter.category;
    }

    try {
        const products = await Product.find(filter).skip((page - 1) * limit).limit(limit);
        return products;
    } catch (error) {
        return;
    }
}

Controller.getProductById = async (id) => {
    try {
        const product = await Product.findById(id);
        return product;
    } catch (error) {
        return;
    }
}

Controller.createProduct = async (product) => {
    try {
        const newProduct = await Product.create(product);
        return newProduct;
    } catch (error) {
        return;
    }
}

Controller.updateProduct = async (id, product) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        return updatedProduct;
    } catch (error) {
        return;
    }
}

Controller.deleteProduct = async (id) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        return deletedProduct;
    } catch (error) {
        return;
    }
}

module.exports = Controller;
