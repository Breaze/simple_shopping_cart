//Load express
const express = require('express');
// Load Controller
const SellerController = require('../app/controllers/SellerController');
const auth = require('../app/middlewares/AuthMiddleware');
const seller = new SellerController;
// Call the router
const api = express.Router();
//var md_auth = require('../middlewares/authenticated');
// Creamos una ruta para los métodos que tenemos en nuestros controladores
/*
api.post('/user', validator.createUser, user.createUser);
api.post('/login', validator.login, user.login);
api.put('/user/basic_info', auth, validator.updateBasicInfo, user.updateBasicInfo);
api.put('/user/password', auth, validator.updatePassword, user.updatePassword);*/
api.get('/sellers', auth, seller.getSellers);
// Export the configuration
module.exports = api;