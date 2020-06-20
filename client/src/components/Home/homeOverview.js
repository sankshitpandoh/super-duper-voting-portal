import React from 'react';

class HomeOverview extends React.Component{
    state={
        pageNo: 1,
        postData: ""
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
        console.log(serverResponse)
    }

    render(){
        return(
            <h1>Overview</h1>
        )
    }
}

export default HomeOverview;