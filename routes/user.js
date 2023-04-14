const express = require('express');

const route = express.Router();
const UserController = require('../controllers/user');

route.get('/', UserController.fn);
route.post('/register', UserController.Register);

module.exports = route