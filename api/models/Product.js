const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    image: String,
    category: String,
    discountedPrice: Number,
    actualPrice: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
