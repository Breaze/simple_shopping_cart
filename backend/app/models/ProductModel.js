const ProductSchema = require('../schemas/ProductSchema');
const mongoose = require('../../config/mongoose');
class ProductModel{
    async getProducts(){
        let products = null;
        products = await ProductSchema.find({}).populate("seller").exec();
        return products;
        
    }

    async getProduct(id){
        let product = null;
        product = await ProductSchema.findById({_id: id}).populate("seller").exec();
        return product;
    }

    async getProductsBySeller(seller_id){
        let products = null;
        products = await ProductSchema.find({seller: seller_id}).populate("seller").exec();
        return products;
    }
}

module.exports = ProductModel;