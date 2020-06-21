import React from 'react';
import '../../stylesheets/Home/expandedPost.css';

let votersList;
class ExpanedPost extends React.Component{
    render(){
        const options = this.props.expandedPostData.postOptions.map((x,index) => {
            return <div className="d-flex w-100 mb-2 px-2" key={index}>
                <div className="single-post-option w-100 p-1 d-flex align-items-center">
                    <p className="w-25">{x.optionValue.optionValue}</p>
                    <span className="d-flex align-items-center p-1">{x.votes}</span>
                    {x.votes !== 0 &&
                        (() => {
                            votersList = x.voters.map((y, index) => {
                                return <p key={index} className="single-voter mr-2 p-1">
                                    {y}
                                </p>
                            })
                        })()
                    }
                    {
                        x.votes !== 0 &&
                        <div className="voters-list d-flex ml-2 p-1">
                        {votersList}
                        </div>
                    }
                </div>
            </div>
        })
        return(
            <div className="single-expanded-post d-flex flex-column w-75 align-items-center">
                <h3 className="mb-2 text-center">{this.props.expandedPostData.postTitle}</h3>
                {this.props.expandedPostData.postDescription !== "" &&
                        <p className="post-description mb-2">{this.props.expandedPostData.postDescription}</p>
                    }
                    <div className="d-flex flex-column w-100">
                        {options}
                    </div>
                    <button className="py-1 px-2 delete-post mt-2 mx-2 " onClick={() => {this.props.deletePost(this.props.expandedPostData.postId)}} >Delete</button>
            </div>
        )
    }
}

export default ExpanedPost