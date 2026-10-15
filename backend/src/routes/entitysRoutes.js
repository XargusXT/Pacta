// src/routes/seccionesRoutes.js
const express = require('express');
const router = express.Router();
const entitysController = require('../controllers/entitysController');

// 🟢 Sin verifyToken, acceso libre
router.get('/', entitysController.getAll);

module.exports = router;