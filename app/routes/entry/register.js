const express = require('express');
const router = express.Router();

const registerRoutes = require('../../controllers/entry/register');

router.post('/register', registerRoutes.CustomerRegister);

module.exports = router;