import React from 'react';
import '../stylesheets/signUp.css';

class SignUp extends React.Component{
    state={
        username: "",
        password: "",
        rePassword: "",
        disabled: true,
        pMatch: true,
    }

    handleUserName = (e) =>{
        this.setState({
            username: e.target.value
        })
    }

    /* Function that is triggered when the user defocuses the username input field */
    deFocused = () =>{
        /* sends the value of input field to checkusername to check if it is available */
        this.props.checkUserName(this.state.username)
    }


    /* Takes an input of  password field, 
    sets password state to the value and 
    passes it to check password function */
    handlePassword = (e) => {
        this.setState({
            password : e.target.value
        }, () => {
            this.checkPasswords()
        })
    }

    /* Takes an input of  re-password field, 
    sets rePassword state to the value and 
    passes it to check password function */
    handleRePassword = (e) => {
        this.setState({
            rePassword : e.target.value
        },() => {
            this.checkPasswords()
        })
    }

    /* checks if the passwords match and then actives the submit button */
    checkPasswords = () => {
        this.state.password === this.state.rePassword ?
        this.setState({
            disabled: false,
            pMatch: true
        })
        :
        this.setState({
            disabled: true,
            pMatch: false
        })
    }

    /* function that send the user input data to register user function */
    signUp = () => {
        this.state.username.trim() !== "" &&
        this.state.password.trim() !== "" && 
        this.state.rePassword.trim() !== "" &&
        this.props.registerUser(this.state.username, this.state.password);
    }

    render(){
        return(
            <div className="sign-up d-flex align-items-center">
                <div className="sign-up-container d-flex flex-column w-50 my-0 mx-auto p-5">
                    <h1>Create a new account</h1>
                    <span className="mb-3 d-flex flex-column">
                        Enter a Username: {!this.props.uNameAvailable && <p>username not available</p>}
                        <input type="text" value= {this.state.username} onChange={this.handleUserName} placeholder="Enter User name here" onBlur={this.deFocused} />
                    </span>
                    <span className="mb-3 d-flex flex-column">
                        Enter Password:
                        <input type="password" value= {this.state.password} onChange={this.handlePassword} placeholder="Enter password here" />
                    </span>
                    <span className="mb-3 d-flex flex-column">
                        Re-Enter Password: {!this.state.pMatch && <p>Passwords don't match</p>}
                        <input type="password" value= {this.state.rePassword} onChange={this.handleRePassword} placeholder="Re-type you password here" />
                    </span>
                    <button className="ml-auto mb-4 w-25 p-2" disabled={this.state.disabled || !this.props.uNameAvailable} onClick={this.signUp}>Sign Up</button>
                    <p>Already have an account? <strong onClick={this.props.switchingLogin}>Click here</strong> to Log In </p>
                </div>
            </div>
        )
    }
}

export default SignUp