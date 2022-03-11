const express = require('express')
const auth = require('../../services/auth/firebaseAuth')

const router = express.Router()

const transactionRecordController = require('../../controllers/modules/transactionRecord')
 
router.get("/list",transactionRecordController.getTransactionRecordFromList)
router.get("/:id", transactionRecordController.getTransactionRecordById)
router.post("/", transactionRecordController.addTransactionRecord)

module.exports = router