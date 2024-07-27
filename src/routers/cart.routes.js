const { Router } = require('express');
const { processOrder } = require('../controllers/cart.controllers');

const router = Router()
router.post('/api/orders', processOrder);

module.exports = router;