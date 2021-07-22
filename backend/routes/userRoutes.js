const router = require("express").Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");

//for sign up
router.post("/register", async (req, res) => {
    try{
        let { firstName, lastName, userName, email, password, passwordCheck } = req.body; 
        //you can use const { firstName, lastName, email, password, passwordCheck} = req.body;    
        //if you don't want to set the values of this by yourself
        //for e.g. - displayName = email;

        //validate

        if(!firstName || !lastName || !email || !password || !passwordCheck){
            return res.status(400).json({message: "Not all the fields have been entered."});
        }

        if(password.length < 8){
            return res
                .status(400)
                .json({message: "Password cannot be less than 8 characters long."});
        }

        if(password !== passwordCheck){
            return res
                .status(400)
                .json({message: "Enter the same password twice for verification."});
        }

        if(!userName)
        {
            userName = firstName + " " + lastName;
        }

        const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res
                .status(400)
                .json({message: "An account with this email already exists."});
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        //create a new user in the database

        const newUser = new User({
            firstName,
            lastName,
            userName,
            email,
            password: passwordHash
        });

        //save the new user

        const savedUser = await newUser.save();
        res.json(savedUser);


    } catch(err) {
        res.status(500).json({message: "Server error",error: err.message});
    }
});

//for login
router.post("/login", async (req, res) => {
    try{

        const {email, password} = req.body;

        //validate the credentials

        if(!email || !password){
            return res.status(400).json({message: "Not all the fields have been entered."});
        }

        const user = await User.findOne({email: email});
        if(!user){
            return res
                .status(404)
                .json({message: "No account with this email has been registered."});
        }

        //compare the passwords

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res
                .status(400)
                .json({message: "Invalid credentials."});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                userName: user.userName
            }
        });

    } catch(err) {
        res.status(500).json({message: "Server error",error: err.message});
    }
});

//delete a user's own account when he's logged in
router.delete("/delete", auth, async (req, res) =>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);

    }catch(err) {
        res.status(500).json({message: "Server error",error: err.message});
    }
});


//whether the token is valid or not
router.post("/tokenIsValid", async (req, res) => {
    try{
        const token = req.header("x-auth-token");
        if(!token){
            return res.json(false);
        }

        //jwt.verify() verifies the token with the secret and returns the decrypted value.
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){
            return res.json(false);
        }

        const user = await User.findById(verified.id);
        if(!user){
            return res.json(false);
        }

        return res.json(true);

    } catch(err) {
        res.status(500).json({message: "Server error",error: err.message});
    }
});

//get() to give back the id and username of the person currently logged in
router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        userName: user.userName,
        id: user._id
    })
});
module.exports = router;