const firebase = require("firebase");

const checkAuthWithFirebase = async (req, res, next) => {
  let user = firebase.auth().currentUser;
  if (user) {
    let uid = req.body.userid;
    const db = firebase.firestore();
    const Users = db.collection("Users");
    const snapshot = await Users.where("userId", "==", uid).get();

    snapshot.forEach((doc) => {
      if (doc.data()) {
        next();
      }
    });
    res.status(401).send({
      message: "Login required",
    });
  } else {
    res.status(401).send({
      message: "Login required",
    });
  }
};

module.exports = {
  checkAuthWithFirebase,
};
