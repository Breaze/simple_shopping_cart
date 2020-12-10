const PurchasedProductsModel = require('../models/PurchasedProductsModel');
const ppm = new PurchasedProductsModel();
class PurchasedProductsController{
    async purchase(req, res){
        const {body} = req;
        const {user_id, date} = body;
        let response = await ppm.purchase(user_id, date);
        res.json(response);
    }

    async getPurchasedProducts(req, res){
        const {query} = req;
        const {user_id} = query;
        let response = await ppm.getPurchasedProducts(user_id);
        res.json(response);
    }
}
module.exports = PurchasedProductsController;