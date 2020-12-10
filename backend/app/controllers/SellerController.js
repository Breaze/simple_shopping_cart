const SellerModel = require('../models/SellerModel');
const seller = new SellerModel();
class SellerController{
    
    async getSellers(req, res){
        const {query} = req;
        const {id} = query;
        let response = null;
        if(id==undefined)
            response = await seller.getSellers();
        else
            response = await seller.getSeller(id);
        res.json(response);
    }
}

module.exports = SellerController;