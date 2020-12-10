//Load express
const express = require('express');
// Load Controller
const UserController = require('../app/controllers/UserController');
const UserValidator = require('../app/middlewares/UserValidator');
const auth = require('../app/middlewares/AuthMiddleware');
const validator = new UserValidator;
const user = new UserController;
// Call the router
const api = express.Router();
//var md_auth = require('../middlewares/authenticated');
// Creamos una ruta para los métodos que tenemos en nuestros controladores
api.post('/user', validator.createUser, user.createUser);
api.post('/login', validator.login, user.login);
api.put('/user/basic_info', auth, validator.updateBasicInfo, user.updateBasicInfo);
api.put('/user/password', auth, validator.updatePassword, user.updatePassword);
// Export the configuration
module.exports = api;