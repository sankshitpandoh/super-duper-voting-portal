import React from 'react';
import '../stylesheets/Admin/admin.css';
import LogIn from '../logIn.js';

class Admin extends React.Component{

    checkCredentials = (username, password) =>{

        /* making a POST request to server with username and password */
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: x , password: y })
        };
        const response = await fetch('/adminLogin', requestOptions);
        let serverResponse = await response.json();
    }
    render(){
        return(
            <>
                <LogIn checkCredentials={this.checkCredentials} />
            </>
        )
    }
}

export default Admin;