import React, {Component} from 'react';
import axios from 'axios';
import config from '../../config/config'
class AddProduct extends Component{
    constructor(props){
        super(props);
        this.state = {
            amount: 1,
            form_status: "",
            color: ""
        }
    }

    handleSubmit = async (event) =>{
        event.preventDefault();
        let amount = parseInt(this.state.amount);
        const user = JSON.parse(sessionStorage.getItem("user"));
        const token = user.token;
        const id_user = user.user_info.id;
        const id_product = this.props.product_id;
        let response = await axios({
            method: 'post',
            url: `${config.base_url}/cart/product`,
            data: {
                id_user,
                id_product,
                amount
            },
            headers: {
                token
            }
        });
        if(response.data==null){
            //alert();
            this.setState({form_status: "El producto ya existe en el carrito"});
            this.setState({color: "red"});
        }else{
            this.setState({form_status: "Producto agregado"});
            this.setState({color: "green"});
        }
       
    }
    handleAmount = (event) =>{
        
        let amount = parseInt(event.currentTarget.value);
        if(amount>0)
            this.setState({amount});
        
    }
    render(){
        const color = {
            color: this.state.color
        }
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Cantidad</label><br/>
                    <input className=" form-control" type="number" value={this.state.amount} onChange={this.handleAmount} />
                    <span style={color}>{this.state.form_status}</span><br/><br/>
                    <input type="submit" min="1" value="Agregar" className="btn btn-primary"/>
                </form>
            </div>
        );
    }
}
export default AddProduct;