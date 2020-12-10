//Load express
const express = require('express');
// Load Controller
const ProductController = require('../app/controllers/ProductController');
const auth = require('../app/middlewares/AuthMiddleware');
const product = new ProductController;
// Call the router
const api = express.Router();
//var md_auth = require('../middlewares/authenticated');
// Creamos una ruta para los métodos que tenemos en nuestros controladores
/*
api.post('/user', validator.createUser, user.createUser);
api.post('/login', validator.login, user.login);
api.put('/user/basic_info', auth, validator.updateBasicInfo, user.updateBasicInfo);
api.put('/user/password', auth, validator.updatePassword, user.updatePassword);*/
api.get('/products', auth, product.getProducts);
// Export the configuration
module.exports = api;