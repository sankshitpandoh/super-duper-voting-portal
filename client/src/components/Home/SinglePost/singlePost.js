import React from 'react';
import '../../stylesheets/Home/singlePost.css'

let singleItem;
class SinglePost extends React.Component{

    render(){
        const options = this.props.singlePostData.postOptions.map((x,index) => {
            return <div className="col-6 mb-2" key={index}>
                <div className="single-post-option p-1 d-flex justify-content-center align-items-center" onClick ={() => {!this.props.adminPrivilege && this.props.handleUserVote(this.props.singlePostData.postId, index)}}>
                    <p>{x.optionValue.optionValue}</p>
                    <span className="d-flex align-items-center p-1">{x.votes}</span>
                </div>
            </div>
        })
        let alreadyVoted = false;
        for(let i = 0; i < this.props.userVoteData.length; i++){
            if(this.props.userVoteData[i] === this.props.singlePostData.postId){
                alreadyVoted = true; 
                break;
            }
        }
        alreadyVoted ?
        (() => {
            singleItem = <div className="col-12 mb-3" onClick ={() => {this.props.adminPrivilege && this.props.expandPost(this.props.singlePostData.postId)}}>
            <div className="single-post already-voted d-flex flex-column p-2">
                <h3 className="mb-2">{this.props.singlePostData.postTitle}</h3>
                {this.props.singlePostData.postDescription !== "" &&
                    <p className="post-description mb-2">{this.props.singlePostData.postDescription}</p>
                }
                <div className="row">
                    {options}
                </div>
            </div>
        </div>
        })()
        :
        (() => {
            singleItem = <div className="col-12 mb-3" onClick ={() => {this.props.adminPrivilege && this.props.expandPost(this.props.singlePostData.postId)}}>
            <div className="single-post d-flex flex-column p-2">
                <h3 className="mb-2">{this.props.singlePostData.postTitle}</h3>
                    {this.props.singlePostData.postDescription !== "" &&
                        <p className="post-description mb-2">{this.props.singlePostData.postDescription}</p>
                    }
                    <div className="row">
                        {options}
                    </div>
            </div>
        </div>
        })()
            
        return(
            <>
                {singleItem}
            </>
        )
    }
}

export default SinglePost;