import React,{ Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

import service from '../services/commonservice';
import {isLoggedIn,session,user,loader} from '../services/actions/action';
class LoginComponent extends Component{
    state={
        user:{
            email:"",
            password:""
        },
        errors:{
            email:"",
            password:""
        },
        formValid:false,
        emailError:true,
        passwordError:true
    }
    
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e){
        const name = e.target.name;
        const value = e.target.value;
        const user = this.state.user;
        user[name] = value;
        this.setState({user},function(){this.validation(name,value)});
    }

    validation(field,value){
        var emailError = this.state.emailError;
        var passwordError = this.state.passwordError;
        var fieldErrors = this.state.errors;
        var formValid = this.state.formValid;
        switch(field){
            case 'email':
                emailError = !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldErrors.email = emailError ? "Enter Valid EMail" : "";
            break;
            case 'password':
                passwordError = value.length <=6;
                fieldErrors.password = passwordError ? "Password too short" :"";
            break;
            default:
                break;
        }
        if(emailError || passwordError){ 
            formValid = false;
        }else{
            formValid = true;
        }

        this.setState({errors:fieldErrors,formValid:formValid,emailError:emailError,passwordError:passwordError});
    }

    validateForm(){
        if(this.state.formValid){
            return true;
        }else{
            if(!this.state.emailError && !this.state.passwordError){
                return true
            } else {
                this.setState({errors:{email:"Email is required",password:"Password is required"}});
                return false;
            }
        }
    }
 
    login(e){
        if(this.validateForm()){
            var url = 'login';
            var model = {
                email:this.state.user.email,
                password:this.state.user.password
            };
            const {dispatch} =this.props;
            dispatch(loader(true));
            var self=this.props;
            service.post(url,model).then(function(res){
                dispatch(loader(false));
                if(res.data.success){
                    dispatch(isLoggedIn());
                    dispatch(session(res.data.token));
                    dispatch(user(res.data.user));
                    self.history.push('/');
                }
            },function(error){
              console.log(error) ;
            });
        }
        e.preventDefault();
    }

    render(){
        return(
            <div className="container">
               <div className="col-md-4">
                    <form onSubmit={this.login}>
                        <div className="form-group">
                            {this.state.emailError ? <label className="error">{this.state.errors.email}</label>:""}
                            <input type="email" className="form-control" placeholder="Email" name="email" value={this.state.user.email} onChange={this.handleInput}/>
                        </div>
                        <div className="form-group">
                            {this.state.passwordError ? <label className="error">{this.state.errors.password}</label>:""}
                            <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.user.password} onChange={this.handleInput}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-full">LOGIN</button>
                        </div>
                    </form>
                    <p>OR</p>
                    <Link from='/login' to='/register'>Register</Link>
               </div>

               {this.state.emailError}
            </div>
        )
    }
}
// LoginComponent.propTypes = {
//     user:PropTypes.object.isRequired,
//     errors:PropTypes.object
// }
export default connect() (LoginComponent);