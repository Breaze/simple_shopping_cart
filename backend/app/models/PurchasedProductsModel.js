const ShoppingCartModel = require('./ShoppingCartModel');
const UserModel = require('./UserModel');
const user = new UserModel();
const scm = new ShoppingCartModel();
const PurchasedProductsSchema = require('../schemas/PurchasedProductsSchema');
const {mongoose} = require('../../config/mongoose');
class PurchasedProductsModel{

    async getCart(user_id){
        let data = await scm.getProducts(user_id);
        let products = [];
        data.forEach(async e=>{
            let temp = {};
            temp.product = mongoose.Types.ObjectId(e.id_product._id);
            temp.amount = e.amount;
            temp.unitaryPrice = e.id_product.unitaryPrice;
            temp.totalPrice = e.amount * e.id_product.unitaryPrice;
            products.push(temp);
            
        });
        return products;
    }

    async purchase(user_id, date){
        let data = await this.getCart(user_id);
        if(data.length==0)
            return false;
        let bill = 0;
        data.forEach(e=>{
            bill += e.totalPrice;
        });
        
        const ps = new PurchasedProductsSchema({
            user: mongoose.Types.ObjectId(user_id),
            products: data,
            totalPrice: bill,
            date
            //date: `${now.getUTCDay()}/${now.getMonth()}/${now.getFullYear()}`
        });
        let user_info = await user.searchById(user_id);
        let newBill = user_info.bill - ps.totalPrice;;
        if(newBill<0)
            return false;
        user.updateBill(user_id, newBill);
        scm.deleteCart(user_id);
        ps.save();
        return true;
    }
   
    
    async getPurchasedProducts(id){
        let products = null;
        products = await PurchasedProductsSchema.find({user: mongoose.Types.ObjectId(id)}).populate("products.product").exec();
        return products;
        
    }

    
    
    
}

module.exports = PurchasedProductsModel;