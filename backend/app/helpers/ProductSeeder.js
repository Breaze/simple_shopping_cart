const SellerSchema = require('../schemas/SellerSchema');
const ProductSchema = require('../schemas/ProductSchema');
const faker = require('faker');
const {mongoose} = require('../../config/mongoose');

async function getSellers(){
    let sellers_ids = [];
    const sellers = await SellerSchema.find({}).exec();
    sellers.map(e=>{
        sellers_ids.push(e._id);
    });
    return sellers_ids;
}

async function createProduct(){
    sellers = await getSellers();
    for(let i = 0; i < 80; i++){
        let random = Math.floor(Math.random() * (sellers.length - 0) + 0);
        const id = sellers[random];
        const product = new ProductSchema(
            {
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                unitaryPrice: faker.commerce.price(),
                imgUrl: faker.image.food(),
                seller: mongoose.Types.ObjectId(id)
            }
        );
        product.save();
    }
}
createProduct();


