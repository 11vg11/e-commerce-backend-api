// This file contains the business logic for authentication.
// It keeps the controller thin and puts the real logic here.
// Flow: controller passes data here -> check user -> hash/compare password -> create token -> return result.

const User = require("../models/User");

const bcrypt = require("bcrypt");

const generateToken = require("../utils/generateTokens");


const registerUser = async (data) => {

    const existingUser = await User.findOne({
        email: data.email
    });


    if (existingUser) {
        throw new Error(
            "user already exists"
        );
    }


    const hashedPassword =
        await bcrypt.hash(
            data.password,
            10
        );



    const user = await User.create({

        username: data.username,

        email: data.email,

        password: hashedPassword
    });

    return user;
};


const loginUser = async (email, password) => {

    const user = await User.findOne({
        email

    });



    if (!user) {
        throw new Error(
            "Invalid credentials"
        );
    }


    const isMatch =
        await bcrypt.compare(
            password,
            user.password
        )



    if (!isMatch) {
        throw new Error(
            "Invalid credentials"
        );
    }


    const token =
        generateToken(user);



    return {
        user,
        token
    };



}


module.exports = {
    registerUser,
    loginUser
};