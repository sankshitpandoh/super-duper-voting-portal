import React from 'react';
import '../../stylesheets/Home/expandedPost.css';

class ExpanedPost extends React.Component{
    render(){
        const options = this.props.expandedPostData.postOptions.map((x,index) => {
            return <div className="col-6 mb-2" key={index}>
                <div className="single-post-option p-1 d-flex justify-content-center align-items-center">
                    <p>{x.optionValue.optionValue}</p>
                    <span className="d-flex align-items-center p-1">{x.votes}</span>
                </div>
            </div>
        })
        return(
            <div className="single-expanded-post d-flex flex-column w-75 align-items-center">
                <h3 className="mb-2">{this.props.expandedPostData.postTitle}</h3>
                {this.props.expandedPostData.postDescription !== "" &&
                        <p className="post-description mb-2">{this.props.expandedPostData.postDescription}</p>
                    }
                    <div className="row">
                        {options}
                    </div>
            </div>
        )
    }
}

export default ExpanedPost