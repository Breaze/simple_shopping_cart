const SellerSchema = require('../schemas/SellerSchema');
const faker = require('faker');
const mongoose = require('../../config/mongoose');

for(let i = 0; i < 20; i++){
    const seller = new SellerSchema(
        {
            businessName: faker.company.companyName(),
            email: faker.internet.email(),
            nit: faker.random.uuid(),
            phone: faker.phone.phoneNumber()
        }
    );
    seller.save();
}