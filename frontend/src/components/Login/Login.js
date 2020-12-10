import React, {Component} from 'react';
import style from './style.css'
import axios from 'axios';
import config from '../../config/config'
import validator from 'react-validation';
import { data } from 'jquery';
import { Redirect, Link} from 'react-router-dom';
import HomePage from '../HomePage/HomePage'
class Login extends Component{
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            form_state: ""
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmail(event) {
        this.setState({email: event.currentTarget.value});
    }
    handlePassword(event) {
        this.setState({password: event.currentTarget.value});
    }
    
    async login(){
        let response = axios({
            method: 'post',
            url: `${config.base_url}/login`,
            data: {
                email: this.state.email,
                password: this.state.password
            }
        });
        
        return response;
    }
    async handleSubmit(event) {
        event.preventDefault();
        if(this.state.email==""){
            this.setState({form_state: "Correo o contraseña incorrectas"});
        }else{
            let response = await this.login();
            let user_info = response.data;
            if(user_info!=null)
            {
                let token = response.headers.token;
                let user = {
                    user_info,
                    token
                };
                sessionStorage.setItem('user', JSON.stringify(user));
                this.setState({form_state: "ok"});
            }else{
                this.setState({form_state: "Correo o contraseña incorrectas"});
            }
            
        }
        
    }
    /*
    verSesion(){
        let user = JSON.parse(sessionStorage.getItem("user"));
        console.log(user);
    }*/
    render(){
        let user = JSON.parse(sessionStorage.getItem('user'));
        if(sessionStorage.getItem('user')==null)
        {
            
            console.log(JSON.parse(sessionStorage.getItem('user')));

            return(
                <Redirect to={'/login'}/>
            );
        }
        const login = <div id="login">
        <h3 className="text-center text-white pt-5">MiCompra.com</h3>
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                    <form id="login-form" className="form" onSubmit={this.handleSubmit}>
                            <h3 className="text-center text-info">Iniciar Sesión</h3>
                            <div className="form-group">
                                <label htmlFor="username" className="text-info">Correo:</label><br/>
                                <input type="email" name="username" id="username" className="form-control" value={this.state.email} onChange={this.handleEmail}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-info">Contraseña:</label><br/>
                                <input type="password" name="password" id="password" className="form-control" value={this.state.password} onChange={this.handlePassword}/>
                                <span style={{color:'red'}}>{this.state.form_state}</span>
                            </div>
                            <div className="form-group">
                                
                                <input type="submit" name="submit" className="btn btn-info btn-md" value="Iniciar"/>
                            </div>
                            <div id="register-link" className="text-right">
                                
                                <br/><Link to={'/signup'} className="text-info">Crear cuenta</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>;
        if(this.state.form_state!="ok"){
            return(
                login
            );
        }
        else{
            return <Redirect to={'/home'}/>
        }
        
    }
}
export default Login;