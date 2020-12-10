import React, {Component} from 'react';
import axios from 'axios';
import config from '../../config/config'
class CartProduct extends Component{
    constructor(props){
        super(props);
        this.state = {
            totalPrice: 0,
            amount : parseInt(this.props.amount)
        }
        
    }
    componentDidMount(){
        let totalPrice = this.props.unitary_price*parseInt(this.state.amount);
        this.setState({totalPrice});
    }

    handleAmount = (e) =>{
        let amount = parseInt(e.currentTarget.value);
        if(amount>0)
            this.setState({amount});   
    }

    deleteProduct = async ()=>{
        const {updateCart} = this.props;
        let confirmation = window.confirm("Está seguro que desea eliminar el producto?");
        let user = JSON.parse(sessionStorage.getItem('user'));
        const token = user.token;
        if(confirmation){
            let response = await axios({
                method: 'delete',
                url: `${config.base_url}/cart/product?id=${this.props.id}`,
                headers: {
                    token
                }
            });
            if(response.data==true){
                alert("El producto se eliminó exitosamente");
                updateCart(true);
            }else{
                alert("No se pudo borrar el producto");
            }
        }
    }

    updateAmount = async ()=>{
        const {updateCart} = this.props;
        let confirmation = window.confirm("Está seguro que desea actualizar la cantidad del producto?");
        let user = JSON.parse(sessionStorage.getItem('user'));
        const token = user.token;
        if(confirmation){
            let response = await axios({
                method: 'put',
                url: `${config.base_url}/cart/product/amount`,
                headers: {
                    token
                },
                data: {
                    id: this.props.id,
                    amount : this.state.amount
                }
            });
            if(response!=null){
                alert("El producto se actualizó exitosamente");
                updateCart(true);
            }else{
                alert("No se pudo actualizar el producto");
            }
        }
    }

    render(){
        return(
            <div className="card">
                        <div className="card-header" id={`heading${this.props.id}`}>
                        <h5 className="mb-0">
                            <button className="btn btn-link collapsed" data-toggle="collapse" data-target={`#collapse${this.props.id}`} aria-expanded="false" aria-controls={`collapse${this.props.id}`}>
                                {this.props.product_name}
                            </button>
                        </h5>
                        </div>
                        <div id={`collapse${this.props.id}`} className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <b><span>Precio Unitario: </span></b><span>${this.props.unitary_price}</span><br/>
                                    <b><span>Precio Total: </span></b><span>${this.state.totalPrice}</span>
                                    <div className="row">
                                        <div className="col-md-10">
                                            <b>Cantidad: </b><input type="number" onChange={this.handleAmount} className="form-control" value={this.state.amount}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <button className="btn btn-danger" onClick={this.deleteProduct}>Borrar Producto</button><br/> <br/>
                                    <button className="btn btn-primary" onClick={this.updateAmount}>Actualizar Cantidad</button>
                                </div>
                                
                            </div>
                        </div>

                        
                    </div>
            </div>
        );
    }
}
export default CartProduct;