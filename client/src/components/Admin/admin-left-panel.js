import React from 'react';
import '../stylesheets/Admin/admin-left-panel.css';

const navContents = ['Overview', 'Add Posts', 'Settings', 'LogOut']

class AdminLeftPanel extends React.Component{
    render(){
        const items = navContents.map((x, index) => {
            return this.props.activeOption === index ?
                <li key={index} className="d-flex justify-content-center px-2 mb-3 active">{x}</li>
                :
                x === "LogOut" ?
                <li key={index} onClick={this.props.logAdminOut} className="d-flex justify-content-center px-2 mb-3">{x}</li>
                :
                <li key={index} onClick={() => {this.props.makeActive(index)}} className="d-flex justify-content-center px-2 mb-3">{x}</li>
        })
        return(
            <div className="d-flex flex-column w-25 admin-left-panel">
                <ul className="py-2">
                    {items}
                </ul>
            </div>
        )
    }
}

export default AdminLeftPanel;