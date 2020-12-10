//Load express
const express = require('express');
// Load Controller
const ShoppingCartController = require('../app/controllers/ShoppingCartController');
const auth = require('../app/middlewares/AuthMiddleware');
const shopping_cart = new ShoppingCartController;

const CartValidator = require('../app/middlewares/CartMiddleware');
const validator = new CartValidator;
// Call the router
const api = express.Router();
//var md_auth = require('../middlewares/authenticated');
// Creamos una ruta para los métodos que tenemos en nuestros controladores
/*
api.post('/user', validator.createUser, user.createUser);
api.post('/login', validator.login, user.login);
api.put('/user/basic_info', auth, validator.updateBasicInfo, user.updateBasicInfo);
api.put('/user/password', auth, validator.updatePassword, user.updatePassword);*/
api.post('/cart/product', auth, validator.addProduct, shopping_cart.addProduct);
api.get('/cart/products', auth, shopping_cart.getProducts);
api.delete('/cart/product', auth, shopping_cart.deleteProduct);
api.delete('/cart', auth, shopping_cart.deleteCart);
api.put('/cart/product/amount', auth, validator.updateProductAmount, shopping_cart.updateProductAmount);
// Export the configuration
module.exports = api;