const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();

const UsersRoutes = require('../../controllers/users/users');
router.use(bodyParser.json());

const auth = require('../../services/auth/firebaseAuth')

router.post('/add', auth.checkAuthWithFirebase, UsersRoutes.addNewUser);
router.get('/', auth.checkAuthWithFirebase ,UsersRoutes.getUserInfoById);
router.put('/update/:ind', auth.checkAuthWithFirebase, UsersRoutes.updateUserInfoById);
router.delete('/delete/:ind', auth.checkAuthWithFirebase, UsersRoutes.deleteUserInfoById);

module.exports = router;