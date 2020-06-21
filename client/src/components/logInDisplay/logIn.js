import React from 'react';
import '../stylesheets/LogIn.css';

class LogIn extends React.Component{
    state = {
        username: "",
        password: "",
        logInError: false,
        logInErrorMessage: ""
    }

    handleUserName = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        }) 
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.state.username.trim() !== "" ?
            this.state.password.trim() !== "" ?
             (() => {
                this.props.checkCredentials(this.state.username, this.state.password);
                this.setState({
                    username: "",
                    password: ""
                })
             })()
             :
             this.setState({
                 logInError: true,
                 logInErrorMessage: "Password field cannot be empty"
             }, () => {
                setTimeout( function(){
                    this.setState({
                        logInError: false,
                        logInErrorMessage: ""
                    })
                }.bind(this), 3000)
            })
             :
             this.setState({
                logInError: true,
                logInErrorMessage: "Username field cannot be empty"
            }, () => {
                setTimeout( function(){
                    this.setState({
                        logInError: false,
                        logInErrorMessage: ""
                    })
                }.bind(this), 3000)
            })
             
    }

    render(){
        return(
            <div className="log-in d-flex align-items-center">
                {this.props.error &&
                <div className="log-in-error d-flex p-1 justify-content-center">
                    Invalid Login Credentials
                </div>
                }
                {
                    this.state.logInError &&
                    <div className="log-in-error d-flex p-1 justify-content-center">
                        {this.state.logInErrorMessage}
                    </div>
                }
                {this.props.hoverMenu &&
                    <div className="message-container d-flex justify-content-center p-1">
                            <p>Account sucessfully created, log in with your credentials</p>
                    </div>
                }
                <div className="log-in-container d-flex flex-column w-50 my-0 mx-auto p-5">
                    <form className="d-flex flex-column align-items-center w-100 mx-auto" onSubmit={this.handleSubmit}>
                        <h2 className="mr-auto mb-3">Login Portal</h2>
                        <span className="d-flex flex-column w-100 mb-4">
                            Username:
                            <input className="p-1" type="text" placeholder="User Name here" value={this.state.username} onChange={this.handleUserName} />
                        </span>
                        <span className="d-flex flex-column w-100 mb-4">
                            Password:
                            <input className="p-1" type="password" placeholder="Password here" value={this.state.password} onChange={this.handlePassword} />
                        </span>
                        <input className="ml-auto mb-4 w-25 p-2 submit-button" type="submit" value="Log In" />
                        <span className="sign-up-message">Don't have an account? <strong onClick={this.props.switchingLogin}>Click here </strong> to SignUp</span>
                    </form>

                </div>
            </div>
        )
    }
}

export default LogIn;