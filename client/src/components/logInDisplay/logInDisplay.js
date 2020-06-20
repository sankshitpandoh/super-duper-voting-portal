import React from 'react';
import LogIn from './logIn.js';
import SignUp from './signUp.js';
import { Redirect } from 'react-router-dom';

class LogInDisplay extends React.Component{
    state={
        // adminPrivilege: false,
        error: false,
        userLoggedIn: false,
        userId: "",
        logInPage: true,
        hoverMenu: false,
        uNameAvailable: true
    }

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
            // adminPrivilege: serverResponse.adminPrivilege,
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

    switchingLogin = () => {
        this.setState({
            logInPage: !this.state.logInPage
        })
    }

        /* function that checks if the username is available while new user
     signing up, that is, 
     it is not used before */
     handleSignUpUserName = async(x) => {
        /* making a POST request with the username entered by user on signing up */
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: x })
        };
        const response = await fetch('/api/checkUserName', requestOptions);
        let serverResponse = await response.json();
        let flag = serverResponse.userNameAvailable; 

        /* if user name is not available,
         it changed the state to false 
         else it changed it to true */
        !flag ?
        this.setState({
            uNameAvailable: false
        })
        :
        this.setState({
            uNameAvailable: true
        })
    }

    /* function that registers a new user to database */
    registerUser = async(x , y) => {

        /* making a post request to server with new user credentials */
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: x , password: y })
        };
        const response = await fetch('/api/signUpUser', requestOptions);
        let serverResponse = await response.json();

        /* if the user is successfully registered,
         takes user back to login page and
         displays success message */
        serverResponse.userRegistered && 
            this.setState({
                logInPage : !this.state.logInPage,
                hoverMenu: true
            }, () => {
                /* hides success message after 3 seconds */
                setTimeout( function(){
                    this.setState({
                        hoverMenu: false
                    })
                }.bind(this), 3000)
            }) 
    }

    render(){
        return(
            <>
                {this.state.userLoggedIn ? 
                <Redirect to={{
                        pathname : "/home"
                        }} />
                :
                this.state.logInPage ?
                <LogIn switchingLogin = {this.switchingLogin} hoverMenu = {this.state.hoverMenu} error = {this.state.error} checkCredentials={this.checkCredentials} />
                :
                <SignUp uNameAvailable = {this.state.uNameAvailable} checkUserName = {this.handleSignUpUserName} switchingLogin = {this.switchingLogin} registerUser = {this.registerUser} />
                }
            </>
        )
    }
}

export default LogInDisplay;