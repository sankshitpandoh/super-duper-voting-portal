import React from 'react';
import '../stylesheets/Home/PostOptionsDisplay.css';

let items;
class PostOptionsDisplay extends React.Component{
    render(){
        this.props.options.length === 0 ?
        items = "No options yet"
        :
        items = this.props.options.map((x, index) => {
            return <div key={index} className="d-flex justify-content-between single-option-display w-100 p-1 mb-2">
                    <div className="d-flex align-items-center">
                        {x}
                    </div>
                    <button className="ml-2" onClick={this.props.deleteOption}>Remove</button>
                   </div>
        })
        return(
            <div className="post-options-container p-2">
             <h3 className="mb-4">Post Options:</h3>
             {items}   
            </div>
        )
    }
}

export default PostOptionsDisplay