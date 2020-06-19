import React from 'react';
import '../stylesheets/Home/addPosts.css'

class HomeAddPosts extends React.Component{
    state={
        postTitle: "",
        postDescription: "",
        singleOption: "",
        options: [],
        error: false,
        errorMessage: ""
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

    handleSingleOption = (e) => {
        let singleOption = e.target.value
        singleOption.trim() !== "" &&
        singleOption.length !== 0 &&
        this.setState({
            singleOption: singleOption
        }, () => {
            console.log(singleOption)
        })
    }

    addOption = () => {
        this.setState({
            options: [...this.state.options, this.state.singleOption ],
            singleOption: ""
        })
    }

    handlePost = (e) => {
        e.preventDefault();
        this.state.postTitle.trim() !== "" ?
            this.state.options.length > 1 ?
            this.props.submitPost(this.state.postTitle, this.state.postDescription, this.state.options)
            :
            this.setState({
                errorMessage: "Minimum Two options should be Provided",
                error: true
            },() => {
                setTimeout( function(){
                    this.setState({
                        error: false,
                        errorMessage: ""
                    })
                }.bind(this), 3000)
            })
            :
            this.setState({
                errorMessage: "Post Title Cannot be Empty",
                error: true
            },() => {
                setTimeout( function(){
                    this.setState({
                        error: false,
                        errorMessage: ""
                    })
                }.bind(this), 3000)
            })
    }

    render(){
        return(
            <div className="add-posts-container">
                {this.state.error &&
                    <div className="post-error-message d-flex justify-content-center p-1 w-100">
                        {this.state.errorMessage}
                    </div>
                }
                <form className="d-flex" onSubmit={this.handlePost} >
                    <div className="col-6">
                        <div className="half-post-container d-flex flex-column p-2">
                            <span className="mb-2">Post Title: *</span>
                            <input className = "mb-4" type="text" onChange={this.handlePostTitle} required />
                            <span className="mb-2">Post Description:</span>
                            <textarea className = "mb-4" onChange={this.handlePostDescription}></textarea>
                            <span className="mb-2">Options: *</span>
                            <span className="w-100">
                                <input className = "mb-4 single-option w-75" type="text" value={this.state.singleOption} onChange={this.handleSingleOption} />
                                <button className="ml-2 p-1" onClick={this.addOption}>Add Option</button>
                            </span>
                            <input className="submit-post" type="submit" value="Add Post" onClick={this.handlePost}/>
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