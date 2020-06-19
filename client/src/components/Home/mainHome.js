import React from 'react';
import '../stylesheets/Home/mainHome.css';
import HomeLeftPanel from './homeLeftPanel';
import HomeAddPosts from './addPosts.js';
import HomeSettings from './homeSettings.js';
import HomeOverview from './homeOverview.js';

class MainHome extends React.Component{
    state={
        activeOption: 0
    }

    openOption = (index) => {
        this.setState({
            activeOption: index
        })
    }
    render(){
        return(
            <div className="main-home d-flex">
                <HomeLeftPanel adminPrivilege={this.props.adminPrivilege} activeOption={this.state.activeOption} makeActive={this.openOption} logOut = {this.props.logOut} />
                { this.props.adminPrivilege ? 
                    (() => {
                    switch(this.state.activeOption){
                        case 1 :
                            return <HomeAddPosts />
                        case 2 : 
                            return <HomeSettings />
                        default :
                            return <HomeOverview />
                    }
                })()
                :
                (() => {
                    switch(this.state.activeOption){
                        case 1 :
                            return <HomeSettings />
                        default :
                            return <HomeOverview />
                    }
                })()
                }
            </div>
        )
    }
}

export default MainHome;