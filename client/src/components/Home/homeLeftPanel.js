import React from 'react';
import '../stylesheets/Home/admin-left-panel.css';

const navContents = ['Overview', 'Add Posts', 'Settings', 'LogOut']

class HomeLeftPanel extends React.Component{
    render(){
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
            <div className="d-flex flex-column admin-left-panel">
                <ul className="py-2">
                    {items}
                </ul>
            </div>
        )
    }
}

export default HomeLeftPanel;