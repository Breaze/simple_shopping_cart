const ShoppingCartSchema = require('../schemas/ShoppingCartSchema');
const {mongoose} = require('../../config/mongoose');
class ShoppingCartModel{
    async addProduct(id_user, id_product, amount){
        let product  = null
        let foundProduct = await this.validate(id_user, id_product);
        if(foundProduct!=null)
            return product
        product = new ShoppingCartSchema(
            {
                id_user: mongoose.Types.ObjectId(id_user),
                id_product: mongoose.Types.ObjectId(id_product),
                amount
            }
        );
        product.save();
        return product;
    }
    async validate(id_user, id_product){
        const foundProduct = await ShoppingCartSchema.findOne({$and: [{ id_user }, { id_product }]}).exec();
        if(foundProduct==null)
            return foundProduct;
        return foundProduct;
    }

    async getProducts(id){
        let products = null;
        products = await ShoppingCartSchema.find({id_user: mongoose.Types.ObjectId(id)}).populate("id_product").exec();
        return products;
        
    }

    async deleteProduct(id){
        let products = false;
        products = await ShoppingCartSchema.deleteOne({_id: id});
        if(products.deletedCount<1)
        {
            products = false;
            return products;
        }
        products = true;
        return products;
    }

    async deleteCart(id){
        let products = false;
        products = await ShoppingCartSchema.deleteMany({id_user: id});
        if(products.deletedCount<1)
        {
            products = false;
            return products;
        }
        products = true;
        return products;
    }

    async updateProductAmount(id, newAmount){
        let updated = null;
        let update = {
            $set:{
                    amount: newAmount
                }
            }
        //console.log(new ObjectId(id));
        updated = await ShoppingCartSchema.findByIdAndUpdate({_id: id}, update, function(err) {
            if (err) {
                console.log(err);
            } else {
                updated = true;
            }
        });
        return updated;
    }
    
}

module.exports = ShoppingCartModel;