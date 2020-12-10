import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Sellers from '../Sellers/Sellers';
import Products from '../Products/Products';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import config from '../../config/config'
import axios from 'axios';
class HomePage extends Component{
    state = {
        seller: "",
    }
    getSeller = (seller) => {
        this.setState({seller});
       
        
    }

    
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
                <div>
                    <Header/>
                    <div className="row">
                        <div className="col-md-3">
                            <Sellers getSeller={this.getSeller}/>
                        </div>
                        <div className="col-md-9">
                            <Products seller={this.state.seller}/>
                        </div>
                    </div>
                </div>
            );
    }
    
    
}
export default HomePage;