import React,{ Component } from 'react';
import PropTypes from 'prop-types'

class LoginComponent extends Component{
    state={
        user:{
            email:"",
            password:""
        },
        errors:{
            email:"",
            password:""
        }
    }
    constructor(props){
        super(props);
        console.log(PropTypes);
    }
    render(){
        return(
            <div className="container">
                <div>LoginComponent</div>
            </div>
        )
    }
}
// LoginComponent.propTypes = {
//     user:PropTypes.object.isRequired,
//     errors:PropTypes.object
// }
export default LoginComponent;