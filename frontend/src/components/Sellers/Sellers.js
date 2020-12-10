import React, {Component} from 'react';
import config from '../../config/config'
import axios from 'axios';
class Sellers extends Component{
    constructor(props){
        super(props);
        this.state = {
            sellers: []
        }
        
    }
  
    getSellers(){
        let user = JSON.parse(sessionStorage.getItem('user'));
        let token = user.token;
        let response = axios({
            method: 'get',
            url: `${config.base_url}/sellers`,
            headers: {
                token
            }
        });
        return response;
    }
    async componentDidMount() {
        let response = await this.getSellers();
        this.setState({sellers:response.data});
    }
    render(){
        const {getSeller} = this.props;
        return(
            <div>
                <h1>Vendedores</h1>
                <ul className="list-group list-group-flush">
                    {this.state.sellers.map( (e, i) =>{
                        return <a href="#"  key={`sellers${i}`} onClick={() => getSeller(e._id)} ><li  className="list-group-item">{e.businessName}</li></a>    
                    })}
                </ul>
            </div>
        );
    }
}
export default Sellers;