import React from 'react';
import LogIn from '../logIn.js';
import { Redirect } from 'react-router-dom';

class LogInDisplay extends React.Component{
    state={
        adminPrivilige: false,
        error: false,
        userLoggedIn: false,
        userId: ""
    }

    // componentDidMount({
        
    // })

    checkCredentials = async(username, password) => {
        /* making a POST request to server to check if admin credentials are correct */
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username , password: password })
        };
        const response = await fetch('/logInUser', requestOptions);
        let serverResponse = await response.json();
        this.setState({
            adminPrivilige: serverResponse.adminPrivilege,
            userLoggedIn: serverResponse.userExist,
            error: !serverResponse.userExist,
            userId: serverResponse.userId
        }, () => {
            this.state.userLoggedIn ?
            localStorage.setItem("userId" , this.state.userId)
            :
            /* removing the error message after 3 seconds */
            setTimeout( function(){
                this.setState({
                    error: false,
                })
            }.bind(this), 3000)
        })
    }

    logAdminOut = () =>{
        this.setState({
            adminHome: false
        })
    }
    render(){
        return(
            <>
                {this.state.userLoggedIn ? 
                <Redirect to="/home" />
                :
                <LogIn error = {this.state.error} checkCredentials={this.checkCredentials} />
                }
            </>
        )
    }
}

export default LogInDisplay;