import React, {Component} from 'react';
import AddProduct from '../AddProduct/AddProduct';
/*classNameName Product extends Component{
    constructor(props){
        super(props);
    }
    render(){
    return(<h1>{this.props.name}</h1>);
    }
}*/

function Product(props){
    return(
        <div className="col-md-4">
            <div className="card" >
                <img className="card-img-top" src={props.imgUrl} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.description}</p>
                    <h6 className="card-title">Precio: ${props.unitaryPrice}</h6>
                    
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#producto${props.id}`}>
                        Agregar a carrito
                    </button>

                    
                    <div className="modal fade" id={`producto${props.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{props.name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <AddProduct 
                                product_id = {props.id}
                                product_name = {props.name}
                                product_img = {props.imgUrl}
                                product_price = {props.unitaryPrice}
                                product_description = {props.description}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;