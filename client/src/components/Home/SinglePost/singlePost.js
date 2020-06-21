import React from 'react';
import '../../stylesheets/Home/singlePost.css';
import Options from './options.js'

let singleItem;
class SinglePost extends React.Component{
    render(){
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
                    <Options alreadyVoted = {alreadyVoted} singlePostData = {this.props.singlePostData} adminPrivilege = {this.props.adminPrivilege} handleUserVote = {this.props.handleUserVote}/>
                </div>
            </div>
        </div>
        })()
        :
        (() => {
            singleItem = <div className="col-12 mb-3" onClick ={() => {this.props.adminPrivilege && this.props.expandPost(this.props.singlePostData.postId)}}>
            <div className="single-post d-flex flex-column p-2" style={{ cursor: `${this.props.adminPrivilege ? "pointer" : "default"}` }}>
                <h3 className="mb-2">{this.props.singlePostData.postTitle}</h3>
                    {this.props.singlePostData.postDescription !== "" &&
                        <p className="post-description mb-2">{this.props.singlePostData.postDescription}</p>
                    }
                    <div className="row">
                        <Options alreadyVoted = {alreadyVoted} singlePostData = {this.props.singlePostData} adminPrivilege = {this.props.adminPrivilege} handleUserVote = {this.props.handleUserVote} />
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