const UserSchema = require('../schemas/UserSchema');
const mongoose = require('../../config/mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../../config/config');
class UserModel{
    async createUser(name, lastName, email, phone, password){
        let newUser = null;
        try{
            const saltRounds = 10;
            const pass = await new Promise((resolve, reject) => {
                bcrypt.hash(password, saltRounds, function(err, tempHash) {
                if (err) reject(err)
                    resolve(tempHash)
                });
            });
            const existingUser = await this.searchByEmail(email);
            if(existingUser)
                return newUser;
            newUser = new UserSchema({name, lastName, email, phone, password: pass});
            newUser.save();
        }catch(e){
            console.log(e);
        }
        return newUser;
    }


    async searchByEmail(email){
        const foundUser = await UserSchema.findOne({email}).exec();
        if(foundUser==null)
            return null;
        return foundUser;
    }

    async searchById(id){
        const foundUser = await UserSchema.findById({_id:id}).exec();
        if(foundUser==null)
            return null;
        return foundUser;
    }

   

    async login(email, pass){
        
        const foundUser = await UserSchema.findOne({email}).exec();
        if(foundUser==null)
            return null;
        const match = await new Promise((resolve, reject) => {
            bcrypt.compare(pass, foundUser.password, function(err, res) {
                if (err) reject(err)
                    resolve(res)
                });
            });
        if(!match){
            return null;
        }
        const token = jwt.sign({name: foundUser.name, lastName: foundUser.lastName, email}, SECRET_KEY);
        let user_info = {
            user: {
                id: foundUser._id,
                name: foundUser.name,
                lastName: foundUser.lastName,
                email: foundUser.email,
                phone: foundUser.phone,
            }, 
            token: token
        }
        return user_info
    }

    async updateBasicInfo(id, name, lastName, email, phone){
        let updated = false;
        let update = {
            $set:{
                    name,
                    lastName,
                    email,
                    phone,
                }
            }
        //console.log(new ObjectId(id));
        updated = await UserSchema.findByIdAndUpdate({_id: id}, update, function(err) {
            if (err) {
                console.log(err);
            } else {
                updated = true;
            }
        });
        if(updated!=null)
        {
            const {_id, name, lastName, email, phone} = updated;
            updated = {
                id: _id, name, lastName, email, phone
            }
        }
        return updated;
    }
    async updatePassword(id, oldPassword, password){
        let updated = false;

        const foundUser = await UserSchema.findOne({_id: id}).exec();
        if(foundUser==null)
            return null;
        const match = await new Promise((resolve, reject) => {
            bcrypt.compare(oldPassword, foundUser.password, function(err, res) {
                if (err) reject(err)
                    resolve(res)
                });
            });
        if(!match){
            return null;
        } 

        const saltRounds = 10;
        const pass = await new Promise((resolve, reject) => {
                bcrypt.hash(password, saltRounds, function(err, tempHash) {
                if (err) reject(err)
                    resolve(tempHash)
                });
        });

        let update = {
            $set:{
                    password: pass,
                }
            }
        updated = await UserSchema.findByIdAndUpdate({_id: id}, update, function(err) {
            if (err) {
                console.log(err);
            } else {
                updated = true;
            }
        });
        if(updated!=null)
        updated = true;
        return updated;
    }

    
    async updateBill(id, newBill){
        let updated = null;
        let update = {
            $set:{
                    bill: newBill
                }
            }
        //console.log(new ObjectId(id));
        updated = await UserSchema.findByIdAndUpdate({_id: id}, update, function(err) {
            if (err) {
                console.log(err);
            } else {
                updated = true;
            }
        });
        return updated;
    }
}

module.exports = UserModel;