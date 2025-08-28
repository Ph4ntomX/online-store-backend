let Controller = {}

const Category = require("../models/category");

Controller.getCategories = async () => {
    const categories = await Category.find().sort({ _id: -1 });
    return categories;
};

Controller.addNewCategory = async (name) => {
    const category = await Category.create({ name });
    return category;
};

Controller.updateCategory = async (id, name) => {
    const category = await Category.findByIdAndUpdate(id, { name });
    return category;
};

Controller.deleteCategory = async (id) => {
    const category = await Category.findByIdAndDelete(id);
    return category;
};

module.exports = Controller;
