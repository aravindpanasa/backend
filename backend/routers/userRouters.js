const express = require('express');
const { registerUser, authUser, allUsers } = require('../controllers/userController')
const { auth } = require('../middleware/authMiddleware');

const Router = express.Router();

Router.route('/').post(registerUser).get(auth, allUsers);

Router.post('/login', authUser);

module.exports = Router;