import React from 'react';
import '../../stylesheets/Home/singlePost.css'

class SinglePost extends React.Component{
    render(){
        return(
            <div className="col-12 mb-3">
                <div className="single-post d-flex flex-column p-2">
                    <h3 className="mb-2">{this.props.singlePostData.postTitle}</h3>
                    {this.props.singlePostData.postDescription !== "" &&
                        <p className="post-description mb-2">{this.props.singlePostData.postDescription}</p>
                    }
                </div>
            </div>
        )
    }
}

export default SinglePost;