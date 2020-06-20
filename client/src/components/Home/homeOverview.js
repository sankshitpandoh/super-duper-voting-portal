import React from 'react';
import '../stylesheets/Home/homeOverview.css';
import SinglePost from './SinglePost/singlePost.js';

class HomeOverview extends React.Component{
    state={
        pageNo: 1,
        postData: []
    }

    componentDidMount(){
        this.getPostData()
    }

    getPostData = async() => {
        /* making a post request to server with new user credentials */
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postBatch: this.state.pageNo })
        };
        const response = await fetch('/getPosts', requestOptions);
        let serverResponse = await response.json();
        this.setState({
            postData: serverResponse
        })
    }

    render(){
        const items = this.state.postData.map((x, index) =>{
            return <SinglePost singlePostData = {x} key={index} />
        })
        return(
            <div className="home-overview py-2">
                <div className="container">
                    <div className="row">
                        {items}
                    </div>
                </div>
            </div>
        )
    } 
}

export default HomeOverview;