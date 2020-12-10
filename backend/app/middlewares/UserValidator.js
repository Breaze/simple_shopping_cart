const BaseValidator = require('./BaseValidator');
class UserValidatorMiddleware extends BaseValidator{
    login(req, res, next){
        const validationRule = {
            "email": "required|email"
        }
        super.validate(req,res,next, validationRule);
    }
    createUser(req, res, next){
        const validationRule = {
            "name" : "required|string",
            "lastName" : "required|string",
            "email" : "required|email",
            "password": "required|string|min:9|confirmed",
        }
        super.validate(req,res,next, validationRule);
    }
    updateBasicInfo(req, res, next){
        const validationRule = {
            "id" : "required|string",
            "name" : "required|string",
            "lastName" : "required|string",
            "email" : "required|email",
        }
        super.validate(req,res,next, validationRule);
    }
    updatePassword(req, res, next){
        const validationRule = {
            "id" : "required|string",
            "oldPassword": "required|string",
            "password": "required|string|min:9|confirmed",
        }
        super.validate(req,res,next, validationRule);
    }
}
module.exports = UserValidatorMiddleware;