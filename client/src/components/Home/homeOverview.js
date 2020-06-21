import React from 'react';
import '../stylesheets/Home/homeOverview.css';
import SinglePost from './SinglePost/singlePost.js';
import ExpanedPost from './SinglePost/ExpandedPost.js';

class HomeOverview extends React.Component{
    state={
        pageNo: 1,
        postData: [],
        moreNext: false,
        expandPost: false,
        expandedPostData: null,
        userVoteData: []
    }

    componentDidMount(){
            this.getPostData();
            this.getUserData(localStorage.getItem('userId'))
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.adminPrivilege !== undefined && this.props.adminPrivilege !== prevProps.adminPrivilege){
            this.getPostData();
        }
    }

    getUserData = async(uId) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: uId })
        };
        const response = await fetch('/getUserData', requestOptions);
        let serverResponse = await response.json();
        this.setState({
            userVoteData: serverResponse.postsVotedOn
        })
    }

    getPostData = async() => {
        /* making a post request to server with new user credentials */
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postBatch: this.state.pageNo, adminPrivilege: this.props.adminPrivilege })
        };
        const response = await fetch('/getPosts', requestOptions);
        let serverResponse = await response.json();
        this.setState({
            postData: serverResponse.responsePostObject,
            moreNext: serverResponse.moreNext
        })
    }

    expandPost = (pId) => {
        for(let i = 0; i < this.state.postData.length; i++){
            if(pId === this.state.postData[i].postId){
                this.setState({
                    expandedPostData: this.state.postData[i],
                    expandPost: true
                })
                break;
            }
        }    
    }

    hideExpandedPost = () => {
        this.setState({
            expandPost: false,
            expandedPostData: null
        })
    }

    deletePost = async(pId) => {
        this.hideExpandedPost();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId: pId, batchNo: this.state.pageNo})
        };
        const response = await fetch('/deletePost', requestOptions);
        let serverResponse = await response.json();
        serverResponse.postDeleted && 
            this.getPostData()
    }

    prevPage = () => {
        this.setState({
            pageNo: this.state.pageNo - 1
        }, () => {
            this.getPostData();
        })
    }

    nextPage = () => {
        this.setState({
            pageNo: this.state.pageNo + 1
        }, () => {
            this.getPostData();
        })
    }

    handleUserVote = async(pId , oId) => {
        let uId = localStorage.getItem('userId');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId: pId, batchNo: this.state.pageNo, optionId: oId, userId: uId})
        };
        const response = await fetch('/userVote', requestOptions);
        let serverResponse = await response.json();
        serverResponse.voteRecordStatus && 
            (() => {
                this.getPostData();
                this.getUserData(localStorage.getItem('userId'));
            })()
    }

    render(){
        const items = this.state.postData.map((x, index) =>{
            return <SinglePost singlePostData = {x} key={index} userVoteData = {this.state.userVoteData} adminPrivilege={this.props.adminPrivilege} expandPost = {this.expandPost} handleUserVote = {this.handleUserVote} />
        })
        return(
            <div className="home-overview py-2" style={{ overflowY: `${this.state.expandPost ? "hidden" : "auto" }`}}>
                <div className="container">
                    <div className="row">
                        {items}
                    </div>
                    {this.state.expandPost &&
                        <div className="expaned-post-container d-flex flex-column align-items-center justify-content-center">
                            <ExpanedPost expandedPostData ={this.state.expandedPostData} deletePost= {this.deletePost} />
                            <button className="hide-post" onClick={this.hideExpandedPost}>&#10006;</button>
                        </div>
                    }
                    <div className="pagination-buttons-container pb-2 d-flex justify-content-center align-items-center">
                        <button className="mr-1" disabled={this.state.pageNo === 1} onClick={this.prevPage}>Prev</button>
                        <button className="ml-1" disabled={!this.state.moreNext} onClick={this.nextPage}>Next</button>
                    </div>
                </div>
            </div>
        )
    } 
}

export default HomeOverview;