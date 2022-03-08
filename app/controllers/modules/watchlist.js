const Users = require("../../../configs");
const firebase = require("firebase");

module.exports.userWatchlist = async (req, res) => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const db = firebase.firestore();
    const Users = db.collection("Users");

    const snapshot = await Users.where('userId', '==', uid).get();
    snapshot.forEach(doc => {
        if (doc.data()) {

            if (doc.data().watch_list.length >= 1) {
                const users_watchlist = doc.data()
                const id = doc.id;
                users_watchlist.watch_list.push(req.body.watch_list[0])
                console.log(users_watchlist)
                Users.doc(id).update(
                    users_watchlist
                )
                res.status(200).json({
                    status: "watch list updated"
                })

            }
            else {
                const users_watchlist = doc.data()
                const id = doc.id;

                users_watchlist["watch_list"] = req.body.watch_list;

                Users.doc(id).update(
                    users_watchlist
                )

                res.status(200).json({
                    status: "Product added in the watch list"
                })
            }
        }

    });
}





module.exports.displayUserWatchlist = async (req, res) => {
    const user = firebase.auth().currentUser;
    if (user) {
        const uid = user.uid;
        const db = firebase.firestore();
        const Users = db.collection("Users");

        const data = []

        const snapshot = await Users.where('userId', '==', uid).get();
        snapshot.forEach(doc => {
            data.push({ watch_list: doc.data().watch_list })

            res.status(200).json({
                status: data[0]
            })
        });
    }

    else {
        res.status(500).json({
            status: "Something went wrong"
        })
    }
}




module.exports.updateUserWatchlist = async (req, res) => {
    const user = firebase.auth().currentUser;
    if (user) {
        const uid = user.uid;
        const db = firebase.firestore();
        const Users = db.collection("Users");
        const snapshot = await Users.where('userId', '==', uid).get();

        let data = []
        let id = ''
        snapshot.forEach(doc => {
            data.push(doc.data().watch_list)
            id = doc.id
        })

        const ind = req.params.ind
        delete req.body.ind
        data[0][ind] = req.body
        console.log({ watch_list: data[0] })

        Users.doc(id).update(
            { watch_list: data[0] }
        )

        res.status(200).json({
            status: "Watch list updated successfully"
        })

    }

    else {
        res.status(500).json({
            status: "Something went wrong"
        })
    }
}





module.exports.deleteUserWatchlist = async (req, res) => {
    const user = firebase.auth().currentUser;
    if (user) {
        const uid = user.uid;
        const db = firebase.firestore();
        const Users = db.collection("Users");

        const data = []
        let id = ''
        const snapshot = await Users.where('userId', '==', uid).get();
        snapshot.forEach(doc => {
            data.push(doc.data().watch_list)
            id = doc.id


            let product_id = req.params.product_id
            data[0] = data[0].filter((item) => item.product_id !== product_id);

            Users.doc(id).update(
                { watch_list: data[0] }
            )

            res.status(200).json({
                status: "Product deleted successfully"
            })
        });
    }

    else {
        res.status(500).json({
            status: "Something went wrong"
        })
    }
}
