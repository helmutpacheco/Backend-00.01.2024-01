const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Ruta para procesar el pago simulado
router.post('/process-payment', paymentController.processPayment);

module.exports = router;