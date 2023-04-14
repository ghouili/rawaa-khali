const express = require('express');
const user = require('../models/user');
const bcrypt = require('bcryptjs');

const fn = async (req, res) => {
    res.send('this is a cotroller');
}

const Register = async (req, res) => {

    const {email, name, tel, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10 );

    let existUser
    try {
        existUser = await user.findOne({ email : email });
    } catch (error) {
        return res.status(500).json({success: false, message: 'something when wrong while extracting data', error: error})        
    }

    if (existUser) {
        return req.status(200).json({success: false, messgae: 'user Already exist!!', error: false});
    }

    const NewUser = new user({
        email,
        name,
        tel,
        password: hashedPassword
    });

    try {
        await NewUser.save();
    } catch (error) {
        return res.status(500).json({success: false, message: 'something when wrong while extracting data', error: error})
    }

    return res.status(201).json({success: true, message: 'success', data: NewUser});
}


exports.fn = fn
exports.Register = Register