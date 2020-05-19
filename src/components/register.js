import React from 'react';
import { Form, Input, Button, Message, Container, Divider } from 'semantic-ui-react';
import axios from '../axios';
import { Link } from 'react-router-dom';

class Register extends React.Component {
	state = {
		email: '',
		username: '',
		password: '',
		region: '',
		error_email: undefined,
		error_username: undefined,
		error_password: undefined,
		error_region: undefined,
		isLoading: false
	};

	onInputChange = (e, { name, value }) => {
		this.setState({ [name]: value.trim(), ['error_' + name]: undefined });
	};

	onSubmit = async () => {
		if (this.validate()) {
			this.setState({ isLoading: true });
			let result = await axios.post('/register', {
				email: this.state.email,
				username: this.state.username,
				password: this.state.password,
				region: this.state.region
			});

			if (result.data.error) {
				this.setState({ error_email: result.data.error.email, error_username: result.data.error.username });
			} else this.props.history.push('/login');
			this.setState({ isLoading: false });
		} else console.log('error');
	};

	validate = () => {
		var errorCount = 0;

		if (!this.emailValidator(this.state.email)) {
			this.setState({ error_email: 'Please enter a valid Email address' });
			errorCount++;
		}
		if (!this.passwordValidator(this.state.password)) {
			this.setState({
				error_password:
					"Invalid Password Format ( only '.' , '@' , '_' , a-z, A-Z , 0-9 are allowed. Min Length = 8 )"
			});
			errorCount++;
		}
		if (!this.usernameValidator(this.state.username)) {
			this.setState({
				error_username:
					"Invalid Username Format ( only '_' , '-' , a-z , A-Z, 0-9 are allowed. Min Length = 4 )"
			});
			errorCount++;
		}
		if (!this.regionValidator(this.state.region)) {
			this.setState({ error_region: 'Please enter your Region' });
		}

		if (errorCount) return false;
		else return true;
	};

	emailValidator = (email) => {
		const pattern = /[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9._-]{3,}[.]{1}[a-zA-Z0-9._-]{2,}/;
		if (email === '' || !pattern.test(email)) return false;
		return true;
	};

	passwordValidator = (password) => {
		if (password === '' || !/[a-zA-Z0-9._@]{8,}/.test(password)) return false;
		return true;
	};

	usernameValidator = (username) => {
		if (username === '' || !/^[a-zA-Z0-9_-]{4,}$/.test(username)) return false;
		return true;
	};

	regionValidator = (region) => {
		if (region === '') return false;
		else return true;
	};

	render() {
		return (
			<Container style={{ width: '400px' }}>
				<center>
					<h1 style={{ color: 'white', margin: '40px' }}>REGISTER</h1>
					<Form error style={{ marginTop: '20px' }}>
						<Form.Input
							icon="mail"
							iconPosition="left"
							transparent
							style={{
								background: '#673ab7',
								border: '10px solid #673ab7',
								borderRadius: '30px',
								height: '50px',
								fontSize: '16px'
							}}
							name="email"
							control={Input}
							value={this.state.email}
							onChange={this.onInputChange}
							placeholder="Email"
						/>
						<Message error content={this.state.error_email} />
						<Form.Input
							icon="user"
							iconPosition="left"
							transparent
							style={{
								background: '#673ab7',
								border: '10px solid #673ab7',
								borderRadius: '30px',
								height: '50px',
								fontSize: '16px'
							}}
							name="username"
							control={Input}
							value={this.state.username}
							onChange={this.onInputChange}
							placeholder="Username"
						/>
						<Message error content={this.state.error_username} />
						<Form.Input
							icon="lock"
							iconPosition="left"
							transparent
							style={{
								background: '#673ab7',
								border: '10px solid #673ab7',
								borderRadius: '30px',
								height: '50px',
								fontSize: '16px'
							}}
							name="password"
							control={Input}
							value={this.state.password}
							onChange={this.onInputChange}
							type="password"
							placeholder="Password"
						/>
						<Message error content={this.state.error_password} />
						<Form.Input
							transparent
							icon="world"
							iconPosition="left"
							style={{
								background: '#673ab7',
								border: '10px solid #673ab7',
								borderRadius: '30px',
								height: '50px',
								fontSize: '16px'
							}}
							name="region"
							control={Input}
							value={this.state.region}
							onChange={this.onInputChange}
							placeholder="Region"
						/>
						<Message error content={this.state.error_region} />
						{this.state.isLoading ? (
							<Button
								loading
								type="submit"
								onClick={this.onSubmit}
								style={{ width: '400px', borderRadius: '25px' }}
							>
								Submit
							</Button>
						) : (
							<Button
								type="submit"
								onClick={this.onSubmit}
								style={{ width: '400px', borderRadius: '25px', fontSize: '16px' }}
							>
								Submit
							</Button>
						)}

						<Divider horizontal inverted>
							Or
						</Divider>
						<Link to="/login">
							<Button positive style={{ width: '400px', borderRadius: '25px', fontSize: '16px' }}>
								Already have an account ?
							</Button>
						</Link>
					</Form>
				</center>
			</Container>
		);
	}
}

export default Register;
