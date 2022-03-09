const express = require('express')
const router = express.Router()

const transactionRecordController = require('../../controllers/modules/transactionRecord')

router.get("/:id",transactionRecordController.getTransactionRecordById)
router.get("/list",transactionRecordController.getTransactionRecordFromList)
router.post("/",transactionRecordController.addTransactionRecord)

module.exports = router