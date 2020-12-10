const UserModel = require('../models/UserModel');
const user = new UserModel();
class UserController{
    
    async createUser(req, res){
        const {body} = req;
        const {name, lastName, email, phone, password} = body;
        let response = await user.createUser(name, lastName, email, phone, password);
        res.json(response);
    }

    async login(req, res){
        const {body} = req;
        const {email, password} = body;
        let response = await user.login(email, password);
        if(response!=null){
            res.setHeader("token", response.token);
            res.json(response.user);    
        }else{
            res.setHeader("token", null);
            res.json(response);
        }
    }

    async updateBasicInfo(req, res){
        const {body} = req;
        const {id, name, lastName, email, phone} = body;
        let response = await user.updateBasicInfo(id, name, lastName, email, phone);
        res.json(response);
    }
    async updatePassword(req, res){
        const {body} = req;
        const {id, oldPassword, password} = body;
        let response = await user.updatePassword(id, oldPassword, password);
        res.json(response);
    }
}

module.exports = UserController;