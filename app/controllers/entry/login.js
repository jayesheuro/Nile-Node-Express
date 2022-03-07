const User = require("../../../configs");
const firebase = require("firebase"); 
const checkUser = require("./state"); 

module.exports.Customerlogin = (req, res)=>{
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((userCredential) => {
      
      res.status(200).json({
        status: req.body.email
    })
    })
    .catch((error) => {
      res.status(500).json({
        status: "Invalid Credentials"
    })
    });
}

checkUser.checkUser()
