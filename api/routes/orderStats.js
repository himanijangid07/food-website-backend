const express = require('express')
const router = express.Router()

const User = require('../models/User')
const Product = require('../models/Product')
const Payment = require('../models/Payments')

const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin')

router.get('/', async (req, res) => {
    try {
        const result = await Payment.aggregate([
            {
                $unwind: '$productItems'
            },
            {
                $addFields: {
                  productItems: { $toObjectId: "$productItems" }
                }
              },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productItems',
                    foreignField: '_id',
                    as: 'productItemsDetails'
                }
            },
            {
                $unwind: '$productItemsDetails'
            },
            {
                $group: {
                    _id: '$productItemsDetails.category',
                    totalQuantity: { $sum: '$quantity' },
                    totalRevenue: { $sum: '$discountedPrice' }
                }
            },
            {
                $project: {  
                    _id: 0,
                    category: '$_id',
                    quantity: '$totalQuantity',
                    revenue: '$totalRevenue'
                }
            }
        ]);
        res.json(result);



    } catch (error) {
        res.status(500).send("Internal server error: " + error.message) 
    }
})

module.exports = router;