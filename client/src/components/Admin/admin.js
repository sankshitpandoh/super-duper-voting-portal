import React from 'react';
import '../stylesheets/Admin/admin.css';
import LogIn from '../logIn.js';
import AdminHome from './adminHome.js'; 

class Admin extends React.Component{
    state={
        adminHome: false
    }

    checkCredentials = async(username, password) => {
        /* making a POST request to server to check if admin credentials are correct */
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username , password: password })
        };
        const response = await fetch('/adminLogin', requestOptions);
        let serverResponse = await response.json();
        this.setState({
            adminHome: serverResponse.adminPrivilege
        })
    }
    
    render(){
        return(
            <>
                {this.state.adminHome ?
                <AdminHome />
                :
                <LogIn checkCredentials={this.checkCredentials} />
                }
            </>
        )
    }
}

export default Admin;