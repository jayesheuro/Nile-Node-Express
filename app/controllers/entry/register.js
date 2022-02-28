const User = require("../../../configs");
const firebase = require("firebase"); 

module.exports.CustomerRegister = async(req,res)=>{
    console.log(req.body)
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then((userCredential) => {
      res.status(200).json({
        status: "User registered successfully"
    })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        status: "Something went wrong"
    })
    });
  }