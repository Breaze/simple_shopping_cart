import React, {Component} from 'react';
import style from './style.css'
import axios from 'axios';
import config from '../../config/config'
import validator from 'react-validation';
import { data } from 'jquery';
import { Redirect, Link } from 'react-router-dom';
import HomePage from '../HomePage/HomePage'
class SignUp extends Component{
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            name: "",
            lastName: "",
            form_state: "",
            phone: "",
            goTo: "/signup"
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmail = (event)=> {
        this.setState({email: event.currentTarget.value});
    }
    handlePassword = (event)=> {
        this.setState({password: event.currentTarget.value});
    }
    handlePasswordConfirmation = (event)=> {
        this.setState({password_confirmation: event.currentTarget.value});
    }
    handleName = (event)=> {
        this.setState({name: event.currentTarget.value});
    }
    handleLastName = (event)=> {
        this.setState({lastName: event.currentTarget.value});
    }
    handlePhone = (event)=> {
        this.setState({phone: event.currentTarget.value});
    }
    async createUser(){
        let response = axios({
            method: 'post',
            url: `${config.base_url}/user`,
            data: {
                name: this.state.name,
                lastName: this.state.lastName,
                email: this.state.email,
                phone: this.state.phone,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            }
        });
        
        return response;
    }
    async handleSubmit(event) {
        event.preventDefault();
        /*let response = await this.createUser();
        console.log(response);*/
        this.createUser().then(response=>{
            this.setState({form_state: ""});
            if(response.data == null){
                this.setState({form_state: "El correo se encuentra en uso"});
            }else{
                this.setState({goTo: '/login'});
                alert("Su cuenta se creó correctamente, inicia sesión para acceder a los servicios");
            }
        }).catch(error=>{
            this.setState({form_state: "Error en los campos"});
        });
        
    }
    /*
    verSesion(){
        let user = JSON.parse(sessionStorage.getItem("user"));
        console.log(user);
    }*/
    render(){
        const signup = <div id="signup">
        <h3 className="text-center text-white pt-5">MiCompra.com</h3>
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                    <form id="login-form" className="form" >
                            <h4 className="text-center text-info">Crear Cuenta</h4>
                            <div className="form-group">
                                <label htmlFor="username" className="text-info">Nombre:</label><br/>
                                <input type="text" name="username" id="username" className="form-control" value={this.state.name} onChange={this.handleName}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" className="text-info">Apellido:</label><br/>
                                <input type="text" name="username" id="username" className="form-control" value={this.state.lastName} onChange={this.handleLastName}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" className="text-info">Correo:</label><br/>
                                <input type="email" name="username" id="username" className="form-control" value={this.state.email} onChange={this.handleEmail}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" className="text-info">Teléfono:</label><br/>
                                <input type="text" name="username" id="username" className="form-control" value={this.state.phone} onChange={this.handlePhone}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-info">Contraseña:</label><br/>
                                <input type="password" name="password" id="password" className="form-control" value={this.state.password} onChange={this.handlePassword}/>
                                
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-info">Confirmación de Contraseña:</label><br/>
                                <input type="password" name="password" id="password" className="form-control" value={this.state.password_confirmation   } onChange={this.handlePasswordConfirmation}/>
                                <span style={{color:'red'}}>{this.state.form_state}</span>
                                
                            </div>
                            <div className="form-group">
                                
                                <Link to={this.state.goTo} onClick={this.handleSubmit} className="btn btn-info btn-md">Registrarme</Link>
                            </div>
                            <div id="register-link" className="text-right">
                                
                                <br/><Link to={'/login'} className="text-info">Iniciar Sesión</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>;
    if(this.state.goTo=="/signup")
        return signup;
    else
        return <Redirect to={this.state.goTo}/>
        
    }
}
export default SignUp;