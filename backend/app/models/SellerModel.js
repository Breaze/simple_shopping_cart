const SellerSchema = require('../schemas/SellerSchema');
const mongoose = require('../../config/mongoose');
class SellerModel{
    async getSellers(){
        let sellers = null;
        sellers = await SellerSchema.find({}).exec();
        return sellers;
        
    }

    async getSeller(id){
        let seller = null;
        seller = await SellerSchema.findById({_id: id}).exec();
        return seller;
    }
}

module.exports = SellerModel;