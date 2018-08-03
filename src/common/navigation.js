import React,{Component} from 'react';
import {connect} from 'react-redux';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Redirect,Link } from 'react-router-dom';

import { logout } from '../services/actions/action';
import Logo from '../assets/image/logo.png';
class Navigation extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props);
        console.log(props)
        this.logout = this.logout.bind(this);
    }

    logout(e){
        const { dispatch } = this.props;
        const { cookies } = this.props;
        cookies.remove('token');
        dispatch(logout());
    }

    render(){
        return (
            <header>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to='/' className="navbar-brand"><img src={Logo} alt="" className="logo"/></Link>
                        </div>
                        <ul className="nav navbar-right">
                            <li><a href="javascript:void(0)">Blogs</a></li>
                            <li><a href="javascript:void(0)">Profile</a></li>
                            <li><a href="javascript:void(0)">Settings</a></li>
                            <li><a href="javascript:void(0)" onClick={this.logout}>Logout</a></li>
                        </ul>
                    </div>
                </nav>
                {!this.props.isLoggedIn ? <Redirect to='/login' /> :""}
            </header>
        )
    }
}

const mapToStateProps = state =>{
    return {
        isLoggedIn:state.isLoggedIn
    }
}
export default connect(mapToStateProps)(withCookies(Navigation));
