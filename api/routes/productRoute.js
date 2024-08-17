const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

const productController = require('../controllers/productControllers')

router.get('/', productController.getAllProductItems)
router.post('/', productController.postProductItem)
router.delete('/:id', productController.deleteProductItem)
router.get('/:id', productController.getSingleProductItem)
router.patch('/:id', productController.updateProductItem)

module.exports = router;