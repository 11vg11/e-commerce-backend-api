const Product = require("../models/Product");



const createProduct = async (productData) => {

    const product = await Product.create(productData);

    return product
};



const gatAllProducts = async () => {

    const products = await Product.find({

        isActive: true
    });


    return products;


};



const getProductById = async (id) => {

    const product = await Product.findOne({
        _id: id,
        isActive: true
    });

    return product;

};


const updateProduct = async (id, productData) => {

    const product = await Product.findOne({
        _id: id,
        isActive: true
    });

    if (!product) {
        return null;
    }

    Object.assign(product, productData);

    await product.save();

    return product;

};



const deleteProduct = async (id) => {

    const product = await Product.findOne({
        _id: id,
        isActive: true
    });

    if (!product) {
        return null;
    }

    product.isActive = false;

    await product.save();

    return product;

};


module.exports = {
    createProduct,
    gatAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};






