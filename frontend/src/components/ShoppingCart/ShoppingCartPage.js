import React, {Component} from 'react';
import axios from 'axios';
import config from '../../config/config'
import CartProduct from '../CartProduct/CartProduct';
import Header from '../Header/Header';
import ShoppingCart from './ShoppingCart';
import { Redirect } from 'react-router-dom';
class ShoppingCartPage extends Component{
    constructor(props){
        super(props);
        
    }
   

    /*async componentDidUpdate(prevProps, prevState){
        if (prevState.update_cart !== this.state.update_cart) {
            let response = await this.getCart();
            this.setState({products:response.data});
        }
    }*/


    render(){
        
        let user = JSON.parse(sessionStorage.getItem('user'));
        if(Object.entries(user).length<1)
        {
            
            console.log(JSON.parse(sessionStorage.getItem('user')));

            return(
                <Redirect to={'/login'}/>
            );
        }
        else
            return(
                <ShoppingCart/>
            );
    }
}
export default ShoppingCartPage;