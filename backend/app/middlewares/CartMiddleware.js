const BaseValidator = require('./BaseValidator');
class CartValidator extends BaseValidator{
    addProduct(req, res, next){
        const validationRule = {
            "id_user": "required|string",
            "id_product": "required|string",
            "amount": "required|integer"
        }
        super.validate(req,res,next, validationRule);
    }
    updateProductAmount(req, res, next){
        const validationRule = {
            "id": "required|string",
            "amount": "required|integer"
        }
        super.validate(req,res,next, validationRule);
    }
}
module.exports = CartValidator;