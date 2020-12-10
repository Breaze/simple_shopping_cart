import React, {Component} from 'react';
import style from './style.css';
import logo1 from '../../assets/logo1.png'
import {Link} from 'react-router-dom';
class Header extends Component{
    signOut(){
      sessionStorage.setItem("user", JSON.stringify({}));
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <Link to="/home" className="navbar-brand" href="#"><img width="40" src={logo1}/></Link>
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <Link to="/home"className="nav-link" href="#">Inicio <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link to="/shopping_cart" className="nav-link" href="#">Carrito</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={this.signOut}href="#">Cerrar Sesión</Link>
                </li>
              </ul>
              
            </div>
            </nav>
        );

    }
}
export default Header;