import React from 'react';

let options;
class Options extends React.Component{
    render(){
        this.props.alreadyVoted ?   
        (() => {
           options =  this.props.singlePostData.postOptions.map((x,index) => {
                return <div className="col-6 mb-2" key={index}>
                    <div className="single-post-option already-voted-options p-1 d-flex justify-content-center align-items-center">
                        <p>{x.optionValue.optionValue}</p>
                        <span className="d-flex align-items-center p-1">{x.votes}</span>
                    </div>
                </div>
            })
        })()
        :
        (() => {
            options = this.props.singlePostData.postOptions.map((x,index) => {
                return <div className="col-6 mb-2" key={index}>
                    <div className="single-post-option p-1 d-flex justify-content-center align-items-center" onClick ={() => {!this.props.adminPrivilege && this.props.handleUserVote(this.props.singlePostData.postId, index)}}>
                        <p>{x.optionValue.optionValue}</p>
                        {/* <span className="d-flex align-items-center p-1">{x.votes}</span> */}
                    </div>
                </div>
            })
        })()
        return(
            <>
             {options}
            </>  
        )
    }
}

export default Options