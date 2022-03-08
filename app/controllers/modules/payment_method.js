const Users = require("../../../configs");
const firebase = require("firebase");

module.exports.userTansaction = async (req, res) => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const db = firebase.firestore();
    const Users = db.collection("Users");
    let Payment_method = []
    let id = ''

    const snapshot = await Users.where('userId', '==', uid).get();
    snapshot.forEach(doc => {
        if (doc.data()) {

            if (doc.data().Payment_method.length > 0) {
                doc.data().Payment_method.map(it => {
                    Payment_method.push(it)

                })
            }
            id = doc.id;

            if (req.body.BankingInfo.payment_type == "netbanking") {
                Payment_method.push({ BankingInfo: req.body.BankingInfo })
            }

            else if (req.body.BankingInfo.payment_type == "debit/credit_card") {
                Payment_method.push({ BankingInfo: req.body.BankingInfo })
            }

            else if (req.body.BankingInfo.payment_type == "upi") {
                Payment_method.push({ BankingInfo: req.body.BankingInfo })
            }

            console.log(Payment_method)
            Users.doc(id).update(
                { Payment_method }
            )

            res.status(200).json({
                status: "Success"
            })
        }
    });
}

module.exports.displayUserTansaction = async (req, res) => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const db = firebase.firestore();
    const Users = db.collection("Users");

    const data = []

    const snapshot = await Users.where('userId', '==', uid).get();

    snapshot.forEach(doc => {
        console.log("here")
        data.push({ Transactions: doc.data().Payment_method })

        res.status(200).json({
            status: data[0]
        })
    });
}

module.exports.updateUserTansaction = async (req, res) => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const db = firebase.firestore();
    const Users = db.collection("Users");
    const snapshot = await Users.where('userId', '==', uid).get();

    let data = []
    let id = ''
    snapshot.forEach(doc => {
        data.push(doc.data().Payment_method)
        id = doc.id
    })

    let payment_type = req.params.payment_type

    data[0].forEach(key => {
        delete key[payment_type]
    })

    data[0] = data[0].filter(
        obj => !(obj && Object.keys(obj).length === 0)
    );

    data[0].push(req.body)
    console.log(data[0])

    Users.doc(id).update(
        { Payment_method: data[0] }
    )

    res.status(200).json({
        status: "Cart updated successfully"
    })
}

module.exports.deleteUserTansaction = async (req, res) => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const db = firebase.firestore();
    const Users = db.collection("Users");
    const snapshot = await Users.where('userId', '==', uid).get();

    let data = []
    let id = ''
    snapshot.forEach(doc => {
        data.push(doc.data().Payment_method)
        id = doc.id
    })

    let ind = req.params.payment_type
    data[0].splice(ind, 1)

    Users.doc(id).update(
        { Payment_method: data[0] }
    )

    res.status(200).json({
        status: data
    })
}
