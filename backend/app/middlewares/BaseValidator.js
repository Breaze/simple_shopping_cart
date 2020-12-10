const ValidatorHelper = require('../helpers/ValidatorHelper');
const helper = new ValidatorHelper;

class BaseValidator{
    constructor(){
        this.validationRule = "";
    }
    validate(req, res, next, validationRule){
        helper.validator(req.body, validationRule, {}, (err, status) => {
            if (!status) {
                res.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed',
                        data: err
                    });
            } else {
                next();
            }
        });
    }
}

module.exports = BaseValidator;