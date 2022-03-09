const Users = require("../../../configs");
const firebase = require("firebase");

const addTransactionHistory = async (req, res) => {
    // const user = firebase.auth().currentUser;
    // const uid = user.uid;
    const uid = req.body.userid
    
    const db = firebase.firestore();
    const Users = db.collection("Users");

    const snapshot = await Users.where('userId', '==', uid).get();
    snapshot.forEach(doc => {
        if (doc.data()) {

            let transaction_history = doc.data().transaction_history
            const id = doc.id;

            transaction_history.push(String(req.body.transaction_id))

            Users.doc(id).update(
                {transaction_history:transaction_history}
            )
            res.status(200).json({
                status: "Success"
            })
        }
    });
}

const displayTansactionHistory = async (req, res) => {
    // const user = firebase.auth().currentUser;
    // const uid = user.uid;
    const uid = req.body.userid
    
    const db = firebase.firestore();
    const Users = db.collection("Users");

    const data = []

    const snapshot = await Users.where('userId', '==', uid).get();
    snapshot.forEach(doc => {
        data.push({ transaction_history: doc.data().transaction_history })

        res.status(200).json({
            status: data[0]
        })
    });
}

const updateTansactionHistory = async (req, res) => {
    // const user = firebase.auth().currentUser;
    // const uid = user.uid;
    const uid = req.body.userid
    
    const db = firebase.firestore();
    const Users = db.collection("Users");
    const snapshot = await Users.where('userId', '==', uid).get();

    let data = []
    let id = ''
    snapshot.forEach(doc => {
        data.push(doc.data().transaction_history)
        id = doc.id
    })

    let transactionhistory = req.params.transactionhistory

    data[0].forEach(key => {
        if (key.transaction_id == transactionhistory) {
            delete key.transaction_id
        }
    })


    data[0] = data[0].filter(
        obj => !(obj && Object.keys(obj).length === 0)
    );

    data[0].push(req.body)
    console.log(data[0])

    Users.doc(id).update(
        { transaction_history: data[0] }
    )

    res.status(200).json({
        status: "Success"
    })
}

const deleteTansactionHistory = async (req, res) => {
    // const user = firebase.auth().currentUser;
    // const uid = user.uid;
    const uid = req.body.userid
    
    const db = firebase.firestore();
    const Users = db.collection("Users");
    const snapshot = await Users.where('userId', '==', uid).get();

    let data = []
    let id = ''
    snapshot.forEach(doc => {
        data.push(doc.data().transaction_history)
        id = doc.id
    })

    let transactionhistory = req.params.transactionhistory


    data[0].forEach(key => {
        if (key.transaction_id == transactionhistory) {
            delete key.transaction_id
        }
    })


    data[0] = data[0].filter(
        obj => !(obj && Object.keys(obj).length === 0)
    );

    Users.doc(id).update(
        { transaction_history: data[0] }
    )

    res.status(200).json({
        status: "Success"
    })
}

module.exports = {
    addTransactionHistory,
    displayTansactionHistory,
    updateTansactionHistory,
    deleteTansactionHistory
}