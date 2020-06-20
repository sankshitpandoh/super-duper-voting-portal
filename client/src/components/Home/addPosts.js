import React from 'react';
import '../stylesheets/Home/addPosts.css';
import PostOptionsDisplay from'./PostOptionsDisplay.js';

let timer = null;

class HomeAddPosts extends React.Component{
    state={
        postTitle: "",
        postDescription: "",
        singleOption: "",
        options: [],
        error: false,
        errorMessage: "",
        responseMessage: "",
        responseStatus: false,

    }
    componentWillUnmount(){
        if(timer){
            clearTimeout(timer);
        }
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
        })
    }

    /* To do fix add option */
    addOption = () => {
        this.setState({
            options: [...this.state.options, this.state.singleOption ],
            singleOption: ""
        })
    }

    handleKeyDown = (e) => {
        e.key === 'Enter' &&
        this.addOption();
    }

    handlePost = (e) => {
        this.state.postTitle.trim() !== "" ?
            this.state.options.length > 1 ?
            (() => {
               let x =  this.props.submitPost(this.state.postTitle, this.state.postDescription, this.state.options);
               x&&
               this.setState({
                   responseMessage: "Post Added Successfully",
                   responseStatus: true,
                   postTitle: "",
                   postDescription: "",
                   singleOption: "",
                   options: []
               },() => {
                setTimeout( function(){
                    this.setState({
                        responseMessage: "",
                        responseStatus: false
                    })
                }.bind(this), 3000)
            })
            })()
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
                timer = setTimeout( function(){
                    this.setState({
                        error: false,
                        errorMessage: ""
                    })
                }.bind(this), 3000)
            })
    }

    deleteOption = (index) => {
        this.state.options.splice(index, 1);
        this.setState({
            options: this.state.options
        })
    }

    render(){
        return(
            <div className="add-posts-container d-flex">
                {this.state.error &&
                    <div className="post-error-message d-flex justify-content-center p-1 w-100">
                        {this.state.errorMessage}
                    </div>
                }
                {
                    this.state.responseStatus &&
                    <div className="post-response-message d-flex justify-content-center p-1 w-100">
                        {this.state.responseMessage}
                    </div>
                }
                    <div className="col-6">
                        <div className="half-post-container d-flex flex-column p-2">
                            <span className="mb-2">Post Title: *</span>
                            <input className = "mb-4" type="text" value={this.state.postTitle} onChange={this.handlePostTitle} required />
                            <span className="mb-2">Post Description:</span>
                            <textarea className = "mb-4" value={this.state.postDescription} onChange={this.handlePostDescription}></textarea>
                            <span className="mb-2">Options: *</span>
                            <span className="w-100">
                                <input className = "mb-4 single-option w-75" onKeyDown={this.handleKeyDown} type="text" value={this.state.singleOption} onChange={this.handleSingleOption} />
                                <button className="ml-2 p-1" onClick={this.addOption}>Add Option</button>
                            </span>
                            <input className="submit-post p-2" type="submit" value="Sumbit Post" onClick={this.handlePost}/>
                        </div>
                    </div>
                    <div className="col-6">
                        <PostOptionsDisplay options = {this.state.options} deleteOption= {this.deleteOption} />
                    </div>
            </div>
        )
    }
}

export default HomeAddPosts;