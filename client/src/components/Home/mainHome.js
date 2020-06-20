import React from 'react';
import '../stylesheets/Home/mainHome.css';
import HomeLeftPanel from './homeLeftPanel';
import HomeAddPosts from './addPosts.js';
import HomeSettings from './homeSettings.js';
import HomeOverview from './homeOverview.js';

class MainHome extends React.Component{
    state={
        activeOption: 0,
        postSubmissionResponse: ""
    }

    openOption = (index) => {
        this.setState({
            activeOption: index
        })
    }

    submitPost = async(title, description, options) =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, description: description, options: options })
        };
        const response = await fetch('/addPost', requestOptions);
        let serverResponse = await response.json();
        console.log(serverResponse)
        return serverResponse
    }

    render(){
        return(
            <div className="main-home d-flex">
                <HomeLeftPanel adminPrivilege={this.props.adminPrivilege} activeOption={this.state.activeOption} makeActive={this.openOption} logOut = {this.props.logOut} />
                { this.props.adminPrivilege ? 
                    (() => {
                    switch(this.state.activeOption){
                        case 1 :
                            return <HomeAddPosts submitPost = {this.submitPost} />
                        case 2 : 
                            return <HomeSettings />
                        default :
                            return <HomeOverview adminPrivilege = {this.props.adminPrivilege} />
                    }
                })()
                :
                (() => {
                    switch(this.state.activeOption){
                        case 1 :
                            return <HomeSettings />
                        default :
                            return <HomeOverview adminPrivilege = {this.props.adminPrivilege} />
                    }
                })()
                }
            </div>
        )
    }
}

export default MainHome;