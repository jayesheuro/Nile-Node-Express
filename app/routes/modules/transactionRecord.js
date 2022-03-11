const express = require('express')
const auth = require('../../services/auth/firebaseAuth')

const router = express.Router()

const transactionRecordController = require('../../controllers/modules/transactionRecord')
// auth.checkAuthWithFirebase, 
router.post("/get/list",transactionRecordController.getTransactionRecordFromList)
router.post("/get/:id", transactionRecordController.getTransactionRecordById)
router.post("/", transactionRecordController.addTransactionRecord)

module.exports = router