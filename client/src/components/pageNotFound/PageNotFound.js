import React from 'react';
import { Link } from 'react-router-dom';
import ErrorImage from '../../images/404.png';
import '../stylesheets/PageNotFound.css';

class PageNotFound extends React.Component{
    render(){
        return(
            <div className="error-page-container d-flex justify-content-center align-items-center flex-column">
                <img className="mb-3" src={ErrorImage} />
                <h1 className="text-center w-50 mb-4">
                    Oops! The page you are looking for couldn't be found.
                </h1>
                <Link to="/">
                    <div className="p-2">
                        <p className="text-center">
                            Go to Home
                        </p>
                    </div>
                </Link>
            </div>
        )
    }
}

export default PageNotFound;