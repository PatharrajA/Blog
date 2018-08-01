import React,{ Component } from 'react';
import {connect} from 'react-redux';

class HomeComponent extends Component{
    constructor(props){
        super(props);
        console.log(props);
    }
    render(){
        return(
            <div className="container">
                <div>Homecomponent</div>
            </div>
        )
    }
}

export default connect() (HomeComponent);