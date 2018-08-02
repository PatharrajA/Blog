import React,{Component} from 'react';
import {connect} from 'react-redux';

class Loader extends Component{
    constructor(props){
        super(props);
        console.log(props)
    }
    render(){
        return (
            <div>
                 {this.props.loader ? <div className="loader"> Loader</div> : ""}
            </div>       
        )
    }
}
const mapStateToProps = state =>{
    return {
        loader:state.loader
    }
}

export default connect(mapStateToProps) (Loader);