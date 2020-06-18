import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/home.js';
import Admin from './components/Admin/admin.js';
import LogInDisplay from './components/logInDisplay/logInDisplay.js';
import './components/stylesheets/general/bootstrap.min.css';
import './components/stylesheets/general/reset.css';

class App extends React.Component{
    render(){
        return(
            <BrowserRouter>
            <>
                <Switch>
                 <Route path="/" component={LogInDisplay} exact/>
                 <Route path="/admin" component={Admin}/>
                 <Route path="/home" component={Home}/>
                <Route component={Error}/>
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