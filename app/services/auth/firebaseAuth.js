const firebase = require("firebase");

const checkAuthWithFirebase=(req,res,next)=>{
    let user = firebase.auth().currentUser
    if(user){
        next()
    }else{
        res.status(401).send({
            message:"Login required"
        })
    }
}

module.exports={
    checkAuthWithFirebase
}