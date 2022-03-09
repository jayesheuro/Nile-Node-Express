const addTransactionRecord = (req,res)=>{
    // generate transaction id
    // add transaction data to the collection
    // place order
    // add transaction id to requried user and inventory documents 
}

const getTransactionRecordById = (req,res)=>{
    // req.params.transaction_id
    // send transaction document
}

const getTransactionRecordFromList = (req,res)=>{
    // req.body={
    //     transaction_list = ["wlbofqn2","biwgbo3g","bwogi3bq"]
    // }
    // send array of all transactions
}

module.exports = {
    addTransactionRecord,
    getTransactionRecordById,
    getTransactionRecordFromList
}