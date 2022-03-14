const User = require("../../../configs");
const firebase = require("firebase");
const checkUser = require("./state");

const Customerlogin = async (req, res) => {
  await firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((userCredential) => {
      console.log(userCredential.user.uid)
      res.status(200).json({
        userid: userCredential.user.uid
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


const loginWithGoogle = async(req,res)=>{
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
    provider.addScope('https://www.googleapis.com/');
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    console.log(token)
    // The signed-in user info.
    var user = result.user;
    console.log(user)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(email)
    console.log(credential)
    // ...
  });
}


checkUser.checkUser()


module.exports={
  Customerlogin,
  logoutUser,
  loginWithGoogle

}
