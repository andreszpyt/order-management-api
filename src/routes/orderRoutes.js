const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { login } = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/login', login);

// Rotas Protegidas
router.post('/order', verifyToken, orderController.createOrder);
router.get('/order/list', verifyToken, orderController.getAllOrders);
router.get('/order/:id', verifyToken, orderController.getOrderById);
router.put('/order/:id', verifyToken, orderController.updateOrder);
router.delete('/order/:id', verifyToken, orderController.deleteOrder);

module.exports = router;