const express = require("express");
const Payment = require("../models/Payments");
const router = express.Router();
const Cart = require('../models/Carts')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const verifyToken = require('../middleware/verifyToken')

router.post('/', verifyToken,  async (req, res) => {
    const payment = req.body;
    try {
        const paymentRequest = await Payment.create(payment);
        const cartIds = payment.cartItems.map(id => new ObjectId(id));
        const deleteCartRequest = await Cart.deleteMany({_id: {$in: cartIds}});

        res.status(200).json({paymentRequest, deleteCartRequest });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

router.get('/', verifyToken, async (req, res) => {
    const email = req.query.email;
    const query = {email: email}
    try {
         const decodedEmail = req.decoded.email;
         if(email !== decodedEmail) {
            res.status(403).json({message: "Forbidden Access"})
         }
         const result = await Payment.find(query).sort({createdAt: -1}).exec()
         res.status(200).json(result)
    } catch (error) {
        res.status(404).json({message: error.message});
    }

})

router.get('/all', async (req, res) => {
    try {
        const payments = await Payment.find({}).sort({createdAt: -1}).exec();
        res.status(200).json(payments )
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

router.patch('/:id', async (req, res) => {
    const payId =  req.params.id;
    const {status} = req.body;
    try {
        const updatedStatus = await Payment.findByIdAndUpdate(payId,
            {status: "confirmed "},
            {new:true, runValidators: true }
        );

        if(!updatedStatus) {
            res.status(404).json({message: "Payment not found"})
        }

        res.status(200).json(updatedStatus)

    } catch (error) {
        res.status(404).json({message: error.message}); 
    }
})

module.exports = router;