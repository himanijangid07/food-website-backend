const Product = require("../models/Product");

const getAllProductItems = async(req, res) => {
    try {
        const products = await Product.find({}).sort({createdAt: -1});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const postProductItem = async (req, res) => {
    const newItem = req.body;
    try {
        const item = await Product.create(newItem);
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
}

const deleteProductItem = async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedItem = await Product.findByIdAndDelete(productId);
        if(!deletedItem) {
            return res.status(404).json({message: "Product not found! "})
        }
        res.status(200).json({message: "Product deleted successfully!"})
    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
}

const getSingleProductItem = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateProductItem = async (req, res) => {
    const productId = req.params.id;
    const {name, image, category, discountedPrice, actualPrice} = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, 
            {name, image, category, discountedPrice, actualPrice}, 
            {new: true, runValidators: true }
        );
        if(!updatedProduct) {
            return res.status(404).json({message: "Product not found! "}) 
        }
        res.status(200).json(updatedProduct )
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAllProductItems,
    postProductItem,
    deleteProductItem,
    getSingleProductItem,
    updateProductItem
}