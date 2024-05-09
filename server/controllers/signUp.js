const User = require("../models/signupModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const signUp = async (req, res) => {
    const formValues = req.body;
    formValues.userName = formValues.userName.toLowerCase()
    console.log(formValues)
    formValues.password = await bcrypt.hash( formValues.password, saltRounds)
    const oldUser = await User.findOne({ email: formValues.email })
    const oldUserName = await User.findOne({ userName: formValues.userName })
    const oldNumber = await User.findOne({ phone: formValues.phone })
    

    if (oldUser) {
        res.status(500).json({ msg: "User with this email already exists" })
    } else if ((oldUserName)) {
        res.status(500).json({ msg: "Username already taken" })
    } else if (oldNumber) {
        res.status(500).json({ msg: "Phone number already taken" })
    }

    else {

        try {
            const newUser = new User(formValues);
            await newUser.save();
            res.status(200).json({ msg: "Sign Up Successfull" })
        } catch (e) {
            console.log(`database error ${e}`);
            res.status(500).json({ msg: "Internal Server Error" })
        }



    }

}




module.exports =  signUp;