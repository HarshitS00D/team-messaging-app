import React from 'react';
import Register from './register';
import Login from './login';
import Home from './home';
import Invite from './invite';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../history';
import { Divider, Image } from 'semantic-ui-react';
import logo from '../logo.png';

const App = () => {
	return (
		<div
			style={{
				overflow: 'hidden'
			}}
		>
			<Image centered src={logo} size="small" />

			<Divider />
			<Router history={history}>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/invite" exact component={Invite} />
					<Route path="/login" exact component={Login} />
					<Route path="/Register" exact component={Register} />
					<Route>
						{' '}
						<h1> Page not Found </h1>{' '}
					</Route>
					<Register />
				</Switch>
			</Router>
		</div>
	);
};

export default App;
