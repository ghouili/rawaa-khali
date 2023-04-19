const express = require('express');
const user = require('../models/user');
const bcrypt = require('bcryptjs');

const GetAll = async (req, res) => {

    let existUsers
    try {
        existUsers = await user.find();
    } catch (error) {
        return res.status(500).json({success: false, message: 'something when wrong while extracting data', error: error})        
    }

    return res.status(200).json({success: true, message: 'success', data: existUsers});

}

const Register = async (req, res) => {

    const {email, name, tel, password} = req.body;

    
    let existUser
    try {
        existUser = await user.findOne({ email : email });
    } catch (error) {
        return res.status(500).json({success: false, message: 'something when wrong while extracting data', error: error})        
    }
    
    if (existUser) {
        return res.status(200).json({success: false, messgae: 'user Already exist!!', error: false});
    }

    const hashedPassword = await bcrypt.hash(password, 10 );
    
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

const Login = async (req, res) => {
    //recieve data:
    const {email, password} = req.body;

    //check user if exist:
    let existUser
    try {
        existUser = await user.findOne({ email : email });
    } catch (error) {
        return res.status(500).json({success: false, message: 'something when wrong while extracting data', error: error})        
    }
    
    if (!existUser) {
        return res.status(200).json({success: false, messgae: 'user doesnt exist!!', error: false});
    }
    
    //compare password:
    let check = await bcrypt.compare(password, existUser.password);
    
    if (!check) {
        return res.status(200).json({success: false, messgae: 'Check your password!!', error: false});
    }

    return res.status(200).json({success: true, message: 'success', data: existUser});

}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existUser
    try {
        existUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, message: 'something when wrong while extracting data', error: error})        
    }

    if (!existUser) {
        return res.status(200).json({success: false, messgae: 'user doesnt exist!!', error: false});
    }

    return res.status(200).json({success: true, message: 'success', data: existUser});

}

const Update = async (req, res) => {

    const {email, name, tel, password} = req.body;
    const { id } = req.params;

    let existUser
    try {
        existUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, message: 'something when wrong while extracting data', error: error})        
    }

    if (!existUser) {
        return res.status(200).json({success: false, messgae: 'user doesnt exist!!', error: false});
    }

    existUser.email = email;
    existUser.name = name;
    existUser.tel = tel;
    existUser.password = await bcrypt.hash(password, 10 );

    try {
        await existUser.save();
    } catch (error) {
        return res.status(500).json({success: false, message: 'something when wrong while extracting data', error: error})
    }

    return res.status(200).json({success: true, message: 'success', data: existUser});
}

const Delete = async (req, res) => {

    const { id } = req.params;

    let existUser
    try {
        existUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, message: 'something when wrong while extracting data', error: error})        
    }

    if (!existUser) {
        return res.status(200).json({success: false, messgae: 'user doesnt exist!!', error: false});
    }

    try {
        await existUser.deleteOne();
    } catch (error) {
        return res.status(500).json({success: false, message: 'something when wrong while extracting data', error: error})
    }
    return res.status(200).json({success: true, message: 'User Deleted Successfully'});

}



exports.GetAll = GetAll
exports.Register = Register
exports.Login = Login
exports.FindById = FindById
exports.Update = Update
exports.Delete = Delete