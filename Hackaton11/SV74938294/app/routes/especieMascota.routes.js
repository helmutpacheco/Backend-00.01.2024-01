// routes/especieMascota.routes.js

const express = require('express');
const router = express.Router();
const especieMascotaController = require('../controllers/especieMascota.controller');

// Rutas para manejar las especies de mascotas
router.get('/especie', especieMascotaController.getAllEspecieMascota);
router.post('/especie', especieMascotaController.addEspecieMascota);
router.get('/especie/:id', especieMascotaController.getEspecieMascotaById);
router.put('/especie/:id', especieMascotaController.updateEspecieMascota);
router.delete('/especie/:id', especieMascotaController.deleteEspecieMascota);

module.exports = router;
