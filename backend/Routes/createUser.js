const express = require ('express');
const router = express.Router();
const user = require ('../models/User')
const {body, validationResult} = require ('express-validator');
const bcrypt = require ('bcryptjs')
const jwt = require ("jsonwebtoken")
const jwtsecret = "MynameisshibupandeyffromMothe1$#"
router.post('/createuser' , [
    body('email', 'Please enter correct email').isEmail(),
    body('name', 'Name more then 5 latter').isLength({min:5}),
    body('password').isLength({min:5})
],async (req,res)=>{

        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()});
        }
        let pass = await bcrypt.genSalt(10);
        let hashPass = await bcrypt.hash(req.body.password, pass);

    try {
       await user.create({
            name: req.body.name,
            email: req.body.email,
            location: req.body.location,
            password: hashPass
        })
        res.json({success:true})
    } catch (error) {
        console.log("error",error);
        res.json({success:false})
    }

})

router.post('/loginuser' , [
    body('email', 'Please enter correct email').isEmail(),
    body('password').isLength({min:5})
],async (req,res)=>{

        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()});
        }
        let email = req.body.email
    try {
       let userdata = await user.findOne({email})
       if(!userdata){
        return res.status(400).json({errors:'Try login with correct credentials'});
       }
       const pwdCompare = await bcrypt.compare(req.body.password,userdata.password)
       if(!pwdCompare){
        return res.status(400).json({errors:'Try login with correct credentials'});
       }

       const data ={
        user:{
            id:userdata.id
        }
       }

       const authToken = jwt.sign(data, jwtsecret)
       console.log("authoToken",authToken)
        res.json({success:true , authToken:authToken})
    } catch (error) {
        console.log("error",error);
        res.json({success:false})
    }

})

router.post('/getuser', fetch, async (req, res) => {
    try {
        const userId = req.user.id;
        const User = await user.findById(userId).select("-password") // -password will not pick password from db.
        res.send(User)
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})

module.exports = router;