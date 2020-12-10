import React, {Component} from 'react';
import axios from 'axios';
import config from '../../config/config'
import CartProduct from '../CartProduct/CartProduct';
import Header from '../Header/Header';
import { Redirect } from 'react-router-dom';
class ShoppingCart extends Component{
    constructor(props){
        super(props);
        this.state = {
            products: [],
            bill: 0
        }
    }
    getCart(){
        let user = JSON.parse(sessionStorage.getItem('user'));
        let token = user.token;
        const user_id = user.user_info.id;
        let response = axios({
            method: 'get',
            url: `${config.base_url}/cart/products?user_id=${user_id}`,
            headers: {
                token
            }
        });
        return response;
    }
    async componentDidMount() {
        let response = await this.getCart();
        this.setState({products:response.data});
        this.getBill();
    }

    /*async componentDidUpdate(prevProps, prevState){
        if (prevState.update_cart !== this.state.update_cart) {
            let response = await this.getCart();
            this.setState({products:response.data});
        }
    }*/
    deleteCart = async () => {
        let confirmation = window.confirm("Está seguro que desea eliminar todos los productos?");
        const user = JSON.parse(sessionStorage.getItem("user"));
        const token = user.token;
        const id_user = user.user_info.id;
        if(confirmation){
            let response = await axios({
                method: 'delete',
                url: `${config.base_url}/cart?id_user=${id_user}`,
                headers: {
                    token
                }
            });
            if(response.data==true){
                this.setState({products: []});
                alert("Todos los productos se elminiaron exitosamente");
            }else{
                alert("No hay productos por borrar");
            }
        }

    }

    updateCart = async (update)=>{
        if(update){
            let response = await this.getCart();
            this.setState({products:response.data});
            this.getBill();
        }
    }

    async getBill(){
        let bill = 0;
        this.state.products.map(e=>{
            bill += e.amount* e.id_product.unitaryPrice;
        });
        this.setState({bill});
    }

    purchase = async ()=>{
        let confirmation = window.confirm("Desea confirmar la compra?");
        const user = JSON.parse(sessionStorage.getItem("user"));
        const token = user.token;
        const user_id = user.user_info.id;

        //Date
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let separator = "/";
        let fullDate = `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`;
        
        if(confirmation){
            let response = await axios({
                method: 'post',
                url: `${config.base_url}/cart/purchase`,
                headers: {
                    token
                },
                data: {
                    user_id,
                    date: fullDate
                }
            });
            if(response.data==true){
                this.setState({products: []});
                this.getBill();
                alert("Compra exitosa");
            }else{
                alert("No hay productos en el carrito");
            }
        }
    }
    render(){
        
            return(
                <div>
                    <Header/>
                    <div className="row">
                        <div className="col-md-2">
                            <h1>Carrito</h1>
                        </div>
                        <div style={{margin: '5px 0 0 0'}} className="col-md-2">
                            <button className="btn btn-danger" onClick={this.deleteCart}>Borrar Todo</button>
                        </div>
                        <div style={{margin: '5px 0 0 0'}} className="col-md-2">
                            <button className="btn btn-success" onClick={this.purchase}>Comprar</button>
                        </div>
                        <div style={{margin: '5px 0 0 0'}} className="col-md-6">
                            <h3><b>Total a Pagar: $</b>{this.state.bill}</h3>
                        </div>
                    </div>
                    
                    <div id="accordion">
                        {this.state.products.map((e,i)=>{
                            return <CartProduct
                                key={i}
                                id={e._id}
                                product_name={e.id_product.name}
                                amount={e.amount}
                                unitary_price={e.id_product.unitaryPrice}
                                updateCart={this.updateCart}
                            />
                        })}
                    </div>
                </div>
            );
    }
}
export default ShoppingCart;