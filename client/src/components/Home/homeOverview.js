import React from 'react';
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
            return <SinglePost key={index} />
        })
        return(
            <div className="home-overview">
                <div className="container">
                    {items}
                </div>
            </div>
        )
    }
}

export default HomeOverview;