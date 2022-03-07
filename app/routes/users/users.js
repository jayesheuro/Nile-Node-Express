const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();

const UsersRoutes = require('../../controllers/users/users');
router.use(bodyParser.json());
router.post('/add', UsersRoutes.Users);


router.get('/users', UsersRoutes.getUsersInfo);
router.put('/update/:ind', UsersRoutes.updateUsersInfo);
router.delete('/delete/:ind', UsersRoutes.deleteUsersInfo);

module.exports = router;