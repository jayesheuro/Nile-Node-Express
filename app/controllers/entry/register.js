const User = require("../../../configs");
const firebase = require("firebase"); 

module.exports.CustomerRegister = async(req,res)=>{
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then((userCredential) => {
      res.status(200).json({
        status: "User registered successfully"
    })
    })
    .catch((error) => {
      res.status(500).json({
        status: "Something went wrong"
    })
    });
  }