import React from 'react';
import '../stylesheets/Home/addPosts.css'

class HomeAddPosts extends React.Component{
    state={
        postTitle: "",
        postDescription: "",
        options: []
    }

    handlePostTitle = (e) => {
        this.setState({
            postTitle: e.target.value
        })
    }

    handlePostDescription = (e) => {
        let pDes = e.target.value
        pDes.trim() !== "" &&
        this.setState({
            postDescription: pDes
        })
    }

    handlePost = (e) => {
        e.preventDefault();
        this.state.postTitle.trim() !== "" &&
            this.state.options.length > 1 &&
            this.props.submitPost(this.state.postTitle, this.postDescription, this.state.options);
    }

    render(){
        return(
            <div className="add-posts-container">
                <form className="d-flex" onSubmit={this.handlePost}>
                    <div className="col-6">
                        <div className="half-post-container d-flex flex-column p-2">
                            <span className="mb-2">Post Title: *</span>
                            <input className = "mb-4" type="text" onChange={this.handlePostTitle} required />
                            <span className="mb-2">Post Description:</span>
                            <textarea className = "mb-4" onChange={this.handlePostDescription}></textarea>
                            <span className="mb-2">Options: *</span>
                            <span className="w-100">
                                <input className = "mb-4 single-option w-75" type="text" />
                                <button className="ml-2 p-1">Add Option</button>
                            </span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="half-post-container d-flex flex-column p-2">
                            <span>Options Display:</span>
                            <div className="d-flex flex-column" id="options-display"></div>   
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default HomeAddPosts;