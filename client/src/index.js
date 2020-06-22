import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/home.js';
import LogInDisplay from './components/logInDisplay/logInDisplay.js';
import PageNotFound from './components/pageNotFound/PageNotFound.js';
import './components/stylesheets/general/bootstrap.min.css';
import './components/stylesheets/general/reset.css';
import './components/stylesheets/general/font-face.css';

class App extends React.Component{
    render(){
        return(
            <BrowserRouter>
            <>
                <Switch>
                 <Route path="/" component={LogInDisplay} exact/>
                 <Route path="/home" component={Home}/>
                <Route path="*" component={PageNotFound}/>
               </Switch>
            </> 
          </BrowserRouter>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
  );