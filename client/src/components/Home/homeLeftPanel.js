import React from 'react';
import '../stylesheets/Home/homeLeftPanel.css';

let navContents;
class HomeLeftPanel extends React.Component{
    render(){
        this.props.adminPrivilege ?
        navContents = ['Overview', 'Add Posts', 'Settings', 'LogOut']
        :
        navContents = ['Overview', 'Settings', 'LogOut']
        const items = navContents.map((x, index) => {
            return this.props.activeOption === index ?
                <li key={index} className="d-flex justify-content-center px-2 mb-3 active">{x}</li>
                :
                x === "LogOut" ?
                <li key={index} onClick={this.props.logOut} className="d-flex justify-content-center px-2 mb-3">{x}</li>
                :
                <li key={index} onClick={() => {this.props.makeActive(index)}} className="d-flex justify-content-center px-2 mb-3">{x}</li>
        })
        return(
            <div className="d-flex flex-column home-left-panel">
                <ul className="py-2">
                    {items}
                </ul>
            </div>
        )
    }
}

export default HomeLeftPanel;