const productService = require("../services/product_service");


const createProduct = async (re, res) => {

    try {


        const product = await productService.createProduct(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });



    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message


        });

    }
};

const getAllProducts = async (req, res) => {

    try {

        const products = await productService.getAllProducts();

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const getProductById = async (req, res) => {

    try {
        const product = await productService.getProductById();

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        res.status(200).json({
            success: true,
            data: product
        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};




const updateProduct = async (req, res) => {

    try {
        const product = await productService.updateProduct(
            req.params.id,
            req.body
        );


        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

};


const deleteProduct = async (req, res) => {

    try {

        const product = await productService.deleteProduct(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};



