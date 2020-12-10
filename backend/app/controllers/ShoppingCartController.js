const ShoppingCartModel = require('../models/ShoppingCartModel');
const cart = new ShoppingCartModel();
class ProductController{
    
    async addProduct(req, res){
        const {body} = req;
        const {id_user, id_product, amount} = body;
        let response = await cart.addProduct(id_user, id_product, amount);
        res.json(response);
    }


    async getProducts(req, res){
        const {query} = req;
        const {user_id} = query;
        let response = null;
        response = await cart.getProducts(user_id);
        res.json(response);
    }

    async deleteProduct(req, res){
        const {query} = req;
        const {id} = query;
        let response = null;
        response = await cart.deleteProduct(id);
        res.json(response);
    }

    async deleteCart(req, res){
        const {query} = req;
        const {id_user} = query;
        let response = null;
        response = await cart.deleteCart(id_user);
        res.json(response);
    }

    async updateProductAmount(req, res){
        const {body} = req;
        const {id, amount} = body;
        let response = null;
        response = await cart.updateProductAmount(id, amount);
        res.json(response);
    }
}

module.exports = ProductController;