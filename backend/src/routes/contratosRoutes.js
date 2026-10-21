const express = require('express');
const router = express.Router();
const contratosController = require('../controllers/contratosController');

// POST /api/contratos/tipos
router.post('/tipos', contratosController.getAll);
//POST /api/contratos/add
router.post('/agregar', contratosController.add);


module.exports = router;