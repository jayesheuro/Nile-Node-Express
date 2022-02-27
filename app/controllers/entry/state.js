const firebase = require("firebase"); 

exports.checkUser = ()=>
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
      var uid = user.uid;
      console.log("Already logged in")
      
  } else {
    console.log("Please log in")
  }
});
