const ProductModel = require('../models/ProductModel');
const product = new ProductModel();
class ProductController{
    async getProducts(req, res){
        const {query} = req;
        const {id, seller_id} = query;
        let response = null;
        if(id!=undefined)
            response = await product.getProduct(id);
        else if(seller_id!=undefined)
            response = await product.getProductsBySeller(seller_id);
        else
            response = await product.getProducts();
        res.json(response);
    }
}

module.exports = ProductController;