import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import PageNotFound from './PageNotFound/PageNotFound';
import HomePage from './HomePage/HomePage';
import Login from './Login/Login';
import shopping_cart from './ShoppingCart/ShoppingCart';
import ShoppingCartPage from './ShoppingCart/ShoppingCartPage';
import SignUp from './SignUp/SignUp';
class App extends Component {
  state = {
    isAuth: false
  }
  render(){
    return(
     <div className="container-fluid">
        <Router>
        <Switch>
          <Route exact path="/" component={()=>(this.state.isAuth)?<HomePage/>:<Login/>}/>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/shopping_cart" component={ShoppingCartPage}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route component={PageNotFound}/>
        </Switch>
        </Router>
     </div>
    );
  }
  authGuardian(){
    let user = JSON.parse(sessionStorage.getItem('user'));
    console.log(Object.entries(user).length);
    if(Object.entries(user).length>0)
    {
      this.setState({isAuth: true});
      
    }
    else
      this.setState({isAuth: false});
  }

  componentDidMount(){
    if(sessionStorage.getItem('user')==null){
      sessionStorage.setItem('user', JSON.stringify({}));
    }
    
    this.authGuardian();
  }
 
  
}


export default App;