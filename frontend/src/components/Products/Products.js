import React, {Component} from 'react';
import config from '../../config/config'
import axios from 'axios';
import Product from '../Product/Product';
class Products extends Component{
    constructor(props){
        super(props);
        this.state = {
            
            products: []
        }
    }
    getProductsBySeller = async () => {
        let user = JSON.parse(sessionStorage.getItem('user'));
        
        let token = user.token;
        let response = await axios({
            method: 'get',
            url: `${config.base_url}/products?seller_id=${this.props.seller}`,
            headers: {
                token
            }
        });
        this.setState(prevState => ({
            products: [...response.data]
         }))
        return response;
    }
    componentDidMount = async () => {
        
            
    }

    async componentDidUpdate(prevProps, prevState){
        if (prevProps.seller !== this.props.seller) {
            this.getProductsBySeller();
        }
    }
    render(){
        return(
            <div>
                <h1>Productos</h1>
                <div className="row">
                    {this.state.products.map((e,i)=>{
                        return <Product
                            key={`product${i}`}
                            id={e._id}
                            description={e.description}
                            name={e.name}
                            unitaryPrice = {e.unitaryPrice}
                            seller = {e.seller}
                            imgUrl = {e.imgUrl}
                        />
                    
                    })}
                
                </div>
            </div>
                //<h1>{this.props.seller}</h1>
        );
    }
}
export default Products;