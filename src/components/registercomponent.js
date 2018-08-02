import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import service from '../services/commonservice';
import {isLoggedIn,session,user,loader} from '../services/actions/action';

class RegisterComponent extends Component{
    state = {
        user:{
            name:"",
            email:"",
            password:""
        },
        errors:{
            name:"",
            email:"",
            password:""
        },
        formValid:false,
        nameError:true,
        emailError:true,
        passwordError:true
    };

    constructor(props){
        super(props);
        this.register = this.register.bind(this);
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
        var emailError = this.state.emailError,
        passwordError = this.state.passwordError,
        nameError = this.state.nameError,
        fieldErrors = this.state.errors;
        switch(field){
            case 'name':
                nameError = value === "";
                fieldErrors.name = nameError ? "Name is required" : ""
            break;
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
        
        if(nameError || passwordError || nameError){
            this.setState({formValid:false});
        }else{
            this.setState({formValid:true});
        }
        this.setState({errors:fieldErrors,emailError:emailError,passwordError:passwordError,nameError:nameError});
    }

    validateForm(){
        if(this.state.formValid){
            return true;
        }else{
            if(!this.state.emailError && !this.state.passwordError && !this.state.nameError){
                return true
            } else {
                this.setState({errors:{email:"Email is required",password:"Password is required",name:"Name is required"}});
                return false;
            }
        }
    }

    register(e){
        if(this.validateForm()){
            const {dispatch} = this.props;
            var url = 'register';
            var model = {
                name:this.state.user.name,
                email:this.state.user.email,
                password:this.state.user.password
            };
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
                console.log(error);
            });
        }
        e.preventDefault();
    }
    render(){
        return(
            <div className="container">
                <div className="col-md-4 auth-container">
                    <form onSubmit={this.register}>
                        <div className="form-group">
                            {this.state.nameError ? <label className="error">{this.state.errors.name}</label> :""}
                            <input type="text" className="form-control" placeholder="Name" name="name" value={this.state.user.name} onChange={this.handleInput} />
                        </div>
                        <div className="form-group">
                            {this.state.emailError ? <label className="error">{this.state.errors.email}</label> :""}
                            <input type="email" className="form-control" placeholder="EMail" name="email" value={this.state.user.email} onChange={this.handleInput} />
                        </div>
                        <div className="form-group">
                            {this.state.passwordError ? <label className="error">{this.state.errors.password}</label> :""}
                            <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.user.password} onChange={this.handleInput} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-full">Register</button>
                        </div>
                    </form>
                    <p>Already Have an Account ?</p>
                    <Link from='/register' to='/login'>Register</Link>
                </div>
            </div>
        )
    }
}
export default connect()(RegisterComponent);