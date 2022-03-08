const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();

const UsersRoutes = require('../../controllers/users/users');
router.use(bodyParser.json());

const auth = require('../../services/auth/firebaseAuth')

router.post('/add', auth.checkAuthWithFirebase, UsersRoutes.Users);
router.get('/', auth.checkAuthWithFirebase ,UsersRoutes.getUsersInfo);
router.put('/update/:ind', auth.checkAuthWithFirebase, UsersRoutes.updateUsersInfo);
router.delete('/delete/:ind', auth.checkAuthWithFirebase, UsersRoutes.deleteUsersInfo);

module.exports = router;