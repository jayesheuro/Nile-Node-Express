const express = require('express');
const router = express.Router();

const loginRoutes = require('../../controllers/entry/login');

router.post('/login', loginRoutes.Customerlogin);
router.post('/logout', loginRoutes.logoutUser);

module.exports = router;