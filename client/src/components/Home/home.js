import React from 'react';
import { Redirect } from 'react-router-dom';

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

    render(){
        return(
            <>
            {
                this.state.userExists ?
                <h1>Home</h1>
                :
                <Redirect to ="/" />
            }
            </>
        )
    }
}

export default Home;