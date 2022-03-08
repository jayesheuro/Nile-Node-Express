const User = require("../../../configs");
const firebase = require("firebase");
const checkUser = require("./state");

const Customerlogin = (req, res) => {
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((userCredential) => {
      res.status(200).json({
        status: req.body.email
      })
    })
    .catch((error) => {
      res.status(500).json({
        status: "Invalid Credentials",
        error: error
      })
    });
}

const logoutUser = async (req, res) => {
  firebase.auth()
    .signOut()
    .then(()=>{
      res.send({
        message:"successfully signed out"
      })
    }).catch((err)=>{
      res.status(500).send({
        message:"some error occured"
      })
    })
}

checkUser.checkUser()

module.exports={
  Customerlogin,
  logoutUser
}
