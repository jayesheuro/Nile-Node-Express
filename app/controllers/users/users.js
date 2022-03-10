const Users = require("../../../configs");
const firebase = require("firebase");

const addNewUser = async (req, res) => {
    const user = firebase.auth().currentUser;
    const email = user.email;
    const uid = req.body.userid

    Address = []
    Contact = []
    let id = ''
    const db = firebase.firestore();
    const Users = db.collection("Users");
    const snapshot = await Users.where("userId", "==", uid).get();
    snapshot.forEach((doc) => {
        if (doc.data()) {
            id = doc.id
            if (doc.data().Address.length > 0) {
                doc.data().Address.map(it => {
                    Address.push(it)

                })
            }

            if (Object.keys(doc.data().Contact).length < 1) {
                req.body.Contact['email'] = email;
                Contact.push(req.body.Contact)

                Users.doc(id).update({ Contact: Contact[0] });
            }
        }
    });

    Address.push(req.body.Address)

    await Users.doc(id).update({ Address });

    res.status(200).json({
        status: "User added successfully"
    })
}

const getUserInfoById = async (req, res) => {
    // const user = firebase.auth().currentUser;
    // const uid = user.uid;
    const uid = req.body.userid
    
    const db = firebase.firestore();
    const Users = db.collection("Users");

    const data = []
    let userId
    const snapshot = await Users.where('userId', '==', uid).get();
    snapshot.forEach(doc => {
        data.push({ Address: doc.data().Address, userId: doc.data().userId, Contact: doc.data().Contact })
        userId = doc.data().userId
        // console.log(data[0].Contact.username)
        res.status(200).json({
            status: data
        })
    });
}

const updateUserInfoById = async (req, res) => {
    // const user = firebase.auth().currentUser;
    // const uid = user.uid;
    const uid = req.body.userid
    
    const ind = req.params.ind
    const db = firebase.firestore();
    const Users = db.collection("Users");
    const snapshot = await Users.where('userId', '==', uid).get();

    snapshot.forEach(doc => {
        var Personal_details = doc.data().Personal_details


        for (const prop in req.body) {
            Personal_details[ind].Personal_details[prop] = req.body[prop]
        }

        console.log(Personal_details)
        Users.doc(doc.id).update(
            { Personal_details }
        )


    })
    res.status(200).json({
        status: "User Information updated successfully"
    })

}

const deleteUserInfoById = async (req, res) => {
    // const user = firebase.auth().currentUser;
    // const uid = user.uid;
    const uid = req.body.userid
    
    let Address = []
    let id = ''
    const ind = req.params.ind
    const db = firebase.firestore();
    const Users = db.collection("Users");
    const snapshot = await Users.where('userId', '==', uid).get();
    snapshot.forEach(doc => {
        Address = doc.data().Address
        id = doc.id
    })

    Address.splice(ind, 1)

    await Users.doc(id).update({ Address });
    res.status(200).json({
        status: "User deleted successfully"
    })
}

module.exports = {
    addNewUser,
    getUserInfoById,
    updateUserInfoById,
    deleteUserInfoById
}