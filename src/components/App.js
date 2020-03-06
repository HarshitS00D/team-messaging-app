import React from 'react';
import Register from './register';
import Login from './login';
import Home from './home';
import Invite from './invite';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../history';
import { Divider } from 'semantic-ui-react';

const App = () => {
	return (
		<div
			style={{
				padding: '80px 40px 80px 40px',
				overflow: 'hidden'
			}}
		>
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
