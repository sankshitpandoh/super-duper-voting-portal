import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/home.js';
import Admin from './components/Admin/admin.js';
import LogInDisplay from './components/logInDisplay/logInDisplay.js';

class App extends React.Component{
    render(){
        return(
            <BrowserRouter>
            <div>
                <Switch>
                 <Route path="/" component={LogInDisplay} exact/>
                 <Route path="/admin" component={Admin}/>
                 <Route path="/home" component={Home}/>
                <Route component={Error}/>
               </Switch>
            </div> 
          </BrowserRouter>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
  );