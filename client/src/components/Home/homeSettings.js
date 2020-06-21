import React from 'react';
import '../stylesheets/Home/HomeSettings.css';

class HomeSettings extends React.Component{
    state={
        oldPassword: "",
        newPassword: "",
        reNewPassword: "",
        showPassword: false,
        disabled: true,
        pMatch: true,
        hoverMessage: false,
        changeStatus: ""
    }

    /* Takes an input of old password field, 
    sets oldpassword state to the value and 
    passes it to check password function */
    handleOldPassword = (e) => {
        this.setState({
            oldPassword : e.target.value
        }, () => {
            this.checkPasswords()
        })
    }

    /* Takes input of new password field,
     sets newpassowrd state to its value and 
     passes it to check password function */
    handleNewPassword = (e) => {
        this.setState({
            newPassword : e.target.value
        }, () => {
            this.checkPasswords()
        })
    }

    /* Takes input of re new password,
     sets renewpassowrd state to its value and
     passes it to check password function */
    handleReNewPassword = (e) => {
        this.setState({
            reNewPassword : e.target.value
        },() => {
            this.checkPasswords()
        })
    }
    
    /* Checks if the new password is equal to the re eneter new password field */
    checkPasswords = () => {
        /* TODO:
        Make button disabled if old password has not been entered */
        this.state.newPassword === this.state.reNewPassword ?
            this.state.newPassword !== "" &&
            /* if both passwords are same enables the update password button */
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
    
    /* function that allows user to see his/ her typed password */
    displayPassword = (e) => {
        e.persist();
        this.state.showPassword ?
        this.setState({
            showPassword: false
        }, () =>{
            e.target.previousSibling.type = "password";
        })
        :
        this.setState({
            showPassword: true
        }, () =>{
            e.target.previousSibling.type = "text";
        })
    }

    /* Function that sends the new password to server to replace the old password with it */
    changePassword = async() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            /* the object that is being sent to server
            it contains, username, old password and new password */
            body: JSON.stringify({ username: this.props.user , oldPassword: this.state.oldPassword, newPassword: this.state.newPassword })
        };
        const response = await fetch('/api/changePassword', requestOptions);
        let serverResponse = await response.json();
        this.setState({
            hoverMessage: true,
            changeStatus: serverResponse.passwordChange,
            oldPassword: "",
            newPassword: "",
            reNewPassword: "",
        }, () => {
            setTimeout( function(){
                this.setState({
                    hoverMessage: false,
                    changeStatus: ""
                })
            }.bind(this), 2000)
        }) 

    }

    render(){
        return(
            <div className="settings-main-display">
                {this.state.hoverMessage &&
                    <div
                    className={"message-container " + (this.state.changeStatus ? 'changed' : 'error')}>
                        {this.state.changeStatus ?
                            <p>Password changed successfully!</p>
                            :
                            <p>Incorrect Old Password</p>
                        }
                    </div>
                }
                <div className="password-change">
                    <h3>Change Password</h3>
                    <span>
                        Enter Old Password:
                        <input type="password" value={this.state.oldPassword} onChange={this.handleOldPassword} placeholder="old password here"/>
                    </span>
                    <span>
                        Enter New Password:
                        <input type="password" value={this.state.newPassword} onChange={this.handleNewPassword} placeholder="new password here"/>
                        <button onMouseDown={this.displayPassword} onMouseUp={this.displayPassword}>Show</button>
                    </span>
                    <span>
                        Enter New Password Again: {!this.state.pMatch && <p>Passwords don't match</p>}
                        <input type="password" value={this.state.reNewPassword} onChange={this.handleReNewPassword} placeholder="re enter new password here"/>
                        <button onMouseDown={this.displayPassword} onMouseUp={this.displayPassword}>Show</button>
                    </span>
                    <button onClick = {this.changePassword} disabled={this.state.disabled}>Update Password</button>
                </div>
            </div>
        )
    }
}

export default HomeSettings;