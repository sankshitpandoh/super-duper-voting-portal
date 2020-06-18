import React from 'react';

class LogIn extends React.Component{
    state = {
        username: "",
        password: ""
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
             this.props.checkCredentials(this.state.username, this.state.password)
             :
             console.log("password field empty")
             :
             console.log("username field empty")
             
    }

    render(){
        return(
            <div className="log-in">
                <div className="container">
                    <h2 className="text-center py-3 mb-5">Admin Login Portal</h2>

                    <form className="d-flex flex-column align-items-center w-50 mx-auto" onSubmit={this.handleSubmit}>
                        <span className="d-flex flex-column w-100 mb-4">
                            Username:
                            <input className="p-1" type="text" placeholder="User Name here" value={this.state.username} onChange={this.handleUserName} />
                        </span>
                        <span className="d-flex flex-column w-100 mb-4">
                            Password:
                            <input className="p-1" type="password" placeholder="Password here" value={this.state.password} onChange={this.handlePassword} />
                        </span>
                        <input className="ml-auto" type="submit" value="Log In" />
                    </form>

                </div>
            </div>
        )
    }
}

export default LogIn;