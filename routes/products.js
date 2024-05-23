const express = require('express');
const router = express.Router();
//get controllers
const { getAllProducts, getAllProductsStatic, getATrialMsg } = require('../controllers/products')
router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsStatic)
router.route('/trial').get(getATrialMsg)

module.exports = router