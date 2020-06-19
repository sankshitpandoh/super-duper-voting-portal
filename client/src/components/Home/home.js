import React from 'react';
import { Redirect } from 'react-router-dom';
import MainHome from './mainHome.js'
class Home extends React.Component{
    state={
        userExists : true
    }

    componentDidMount(){
        localStorage.getItem('userId') === null &&
        this.setState({
            userExists: false
        })
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
                <MainHome logOut = {this.logOut}/>
                :
                <Redirect to ="/" />
            }
            </>
        )
    }
}

export default Home;