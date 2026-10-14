const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/loginJuridico
router.post('/loginJuridico', authController.loginJuridico);
// POST /api/auth/loginAdmin
router.post('/loginAdmin', authController.loginAdmin);

module.exports = router;