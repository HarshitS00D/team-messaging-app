import React from 'react';
import Register from './register';
import Login from './login';
import Home from './home';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../history';

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/Register" exact component={Register} />
                    <Route> <h1> Page not Found </h1> </Route>
                    <Register />
                </Switch>
            </Router>
        </div>
    );
};

export default App;