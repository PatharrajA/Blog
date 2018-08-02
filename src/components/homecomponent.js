import React,{ Component } from 'react';
import {connect} from 'react-redux';

import service from '../services/commonservice';

class HomeComponent extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.loadBlog();
    }

    loadBlog(){
        var url='blog';
        service.get(url).then(function(res){
            console.log(res);
        },function(error){
            console.log(error);
        })
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