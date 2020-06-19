import React from 'react';
import '../stylesheets/Admin/adminHome.css';
import AdminLeftPanel from'./admin-left-panel.js';
import AdminAddPosts from './adminAddPosts.js';
import AdminSettings from './adminSettings.js';
import AdminOverview from './adminOverview.js';

class AdminHome extends React.Component{
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
            <div className="admin-home d-flex">
                <AdminLeftPanel activeOption={this.state.activeOption} makeActive={this.openOption} logAdminOut = {this.props.logAdminOut} />
                {(() => {
                    switch(this.state.activeOption){
                        case 1 :
                            return <AdminAddPosts />
                        case 2 : 
                            return <AdminSettings />
                        default :
                            return <AdminOverview />
                    }
                })()}
            </div>
        )
    }
}

export default AdminHome;