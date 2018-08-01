import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch,Route,Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


import LoginComponent from './components/logincomponent';
import RegisterComponent from './components/registercomponent';
import HomeComponent from './components/homecomponent';
import ProfileComponent from './components/profilecomponent';
import BlogComponent from './components/blogcomponent';

import { isLoggedIn,session } from './services/actions/action';

var loggedIn = false;

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props){
    super(props);
  }

  componentWillMount(){
    const { dispatch } =this.props;
    const { cookies } = this.props;
    var token=cookies.get('token');
    if(token !== "" && token !== null && token !== undefined){
      dispatch(isLoggedIn());
      dispatch(session(token));
      loggedIn=true;
    }else{
      loggedIn = false;
    }
  }

  render() {
    return (
      <Switch>
        <Route path="/login" component={LoginComponent} />
        <Route path='/register' component={RegisterComponent} />
        <PrivateRoute path='/' exact component={HomeComponent} />
        <PrivateRoute path='/profile' component={ProfileComponent} />
        <PrivateRoute path='/blog' component={BlogComponent} />
      </Switch>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    loggedIn
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

export default connect()(withCookies(App));
