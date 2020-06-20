import React from 'react';
import '../stylesheets/Home/homeOverview.css';
import SinglePost from './SinglePost/singlePost.js';

class HomeOverview extends React.Component{
    // constructor(props){
    //     super(props)
    // }
    state={
        pageNo: 1,
        postData: []
    }

    componentDidMount(){
        if(this.props.adminPrivilege === false){
            this.getPostData();
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.adminPrivilege !== undefined && this.props.adminPrivilege !== prevProps.adminPrivilege){
            this.getPostData();
            console.log(prevProps)
            console.log(this.props)
        }
    }

    getPostData = async() => {
        /* making a post request to server with new user credentials */
        console.log(this.props.adminPrivilege)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postBatch: this.state.pageNo, adminPrivilege: this.props.adminPrivilege })
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
            <div className="home-overview w-100 py-2">
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