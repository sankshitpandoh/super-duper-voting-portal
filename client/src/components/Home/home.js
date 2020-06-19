import React from 'react';
import { Redirect } from 'react-router-dom';
import MainHome from './mainHome.js'
class Home extends React.Component{
    state={
        userExists : true,
        adminPrivilege: false
    }

    componentDidMount(){
        localStorage.getItem('userId') === null ?
        this.setState({
            userExists: false
        })
        :
        (async() => {
            let userId =  localStorage.getItem('userId');
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userId })
            };
            const response = await fetch('/getUserDetails', requestOptions);
            let serverResponse = await response.json();
            let adminPrivilege = serverResponse.adminPrivilege;
            this.setState({
                adminPrivilege: adminPrivilege
            })
        })();
    }

    logOut = () =>{
        this.setState({
            userExists: false
        }, () => {
            localStorage.removeItem('userId')
        })
    }
    
    render(){
        return(
            <>
            {
                this.state.userExists ?
                <MainHome adminPrivilege={this.state.adminPrivilege} logOut = {this.logOut}/>
                :
                <Redirect to ="/" />
            }
            </>
        )
    }
}

export default Home;