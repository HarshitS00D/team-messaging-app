import React from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import axios from '../axios';

class Login extends React.Component {
	state = {
		username: '',
		password: '',
		error: undefined
	};

	onInputChange = (e, { name, value }) => {
		this.setState({ [name]: value, error: undefined });
	};

	onSubmit = async () => {
		if (this.validate()) {
			let res = await axios.post('/login', { username: this.state.username, password: this.state.password });
			if (res.data.length) {
				sessionStorage.setItem('userid', res.data[0]._id);
				this.props.history.push('/');
			} else this.setState({ error: 'Invalid Email or Password' });
		} else console.log('error');
	};

	validate = () => {
		let errorCount = 0;
		if (!this.usernameValidator(this.state.username)) {
			errorCount++;
		}
		if (!this.passwordValidator(this.state.password)) {
			errorCount++;
		}

		if (errorCount) {
			this.setState({ error: 'Invalid Username or Password' });
			return false;
		} else return true;
	};

	usernameValidator = (username) => {
		if (username === '' || !/^[a-zA-Z0-9_-]{4,}$/.test(username)) return false;
		return true;
	};

	passwordValidator = (password) => {
		if (password === '' || !/[a-zA-Z0-9._@]{8,}/.test(password)) return false;
		return true;
	};

	render() {
		return (
			<div>
				<h1>Login</h1>
				<Form error>
					<Form.Field
						name="username"
						control={Input}
						value={this.state.username}
						onChange={this.onInputChange}
						placeholder="Username"
					/>
					<Form.Field
						name="password"
						control={Input}
						value={this.state.password}
						onChange={this.onInputChange}
						type="password"
						placeholder="password"
					/>
					<Message error content={this.state.error} />
					<Button type="submit" onClick={this.onSubmit}>
						Submit
					</Button>
				</Form>
			</div>
		);
	}
}

export default Login;
