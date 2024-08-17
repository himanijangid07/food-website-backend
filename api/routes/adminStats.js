const express = require('express')
const router = express.Router()

const User = require('../models/User')
const Product = require('../models/Product')
const Payment = require('../models/Payments')

const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin')

router.get('/', async (req, res) => {
    try {
        const users = await User.countDocuments();
        const productItems = await Product.countDocuments();
        const orders = await Payment.countDocuments();

        const result = await Payment.aggregate([{
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: '$price'
                }
            }
        }])

        const revenue = result.length > 0 ? result[0].totalRevenue : 0

        res.status(200).json({
            users,
            productItems,
            orders,
            revenue 
        })

    } catch (error) {
        res.status(500).send("Internal server error: " + error.message) 
    }
})

module.exports = router;