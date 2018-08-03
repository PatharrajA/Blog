import React,{ Component } from 'react';
import {connect} from 'react-redux';

import service from '../services/commonservice';


class HomeComponent extends Component{
    state ={
        blog:[]
    }
   
    constructor(props){
        super(props);
        console.log(props);
        this.loadBlog();
    }

    loadBlog(){
        var url='blog';
        const self=this;
        service.get(url).then(function(res){
            if(res.data.success){
                self.setState({blog:res.data.data});
            }else{
                self.setState({blog:[]});
            }
        },function(error){
            console.log(error);
        })
    }
    render(){
        return(
            <div className="container-fluid">
                <div className="col-md-9">
                {this.state.blog.length>0 ?
                <div className="col-md-12">
                  {this.state.blog.map(blog=>
                    <div className="col-md-3">
                        <div className="col-md-12 profile-header"><img src={blog.author.avatar} alt="profile"/><span>{blog.author.name}</span></div>
                        <p>{blog.blog_title}</p>
                        <div className="col-md-12" >
                            {blog.feature_media.type === "image" ? <img src={blog.feature_media.src} alt=""/>:""}
                            {blog.feature_media.type === "video" ? <video controls="true" src={blog.feature_media.src} alt=""/>:""}
                            {blog.feature_media.type === "audio" ? <audio controls="true" src={blog.feature_media.src} alt=""/>:""}
                        </div>
                        <p>{blog.blog_content}</p>
                        <ul>
                            {blog.blog_tag.map(tag=>
                                tag
                            )}
                        </ul>
                        <div className="comment">
                            <ul>
                                <li><a href="javascript:void(0)">Like</a></li>
                                <li> {blog.blog_type === "Question" ? <a href="javascript:void(0)">Answer</a>:<a href="javascript:void(0)">Comment</a>}</li>
                            </ul>
                        </div>
                    </div>
                    )}
                    </div>
                    :  <div> No Blog Found !</div>
                    
                    }
                </div>
                <div className="col-md-3">
                </div>
            </div>
        )
    }
}

export default connect() (HomeComponent);