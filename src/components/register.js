import React from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import axios from 'axios';

class Register extends React.Component {
    state = {
        email: "",
        username: "",
        password: "",
        region: "",
        error_email: undefined,
        error_username: undefined,
        error_password: undefined,
        error_region: undefined
    }

    onInputChange = (e, { name, value }) => {
        this.setState({ [name]: value.trim(), ['error_' + name]: undefined });

    }

    onSubmit = async () => {
        if (this.validate()) {
            await axios.post('http://localhost:4000/register', { email: this.state.email, username: this.state.username, password: this.state.password, region: this.state.region });
            this.props.history.push('/login');
        }
        else console.log("error");
    }

    validate = () => {
        var errorCount = 0;

        if (!this.emailValidator(this.state.email)) {
            this.setState({ error_email: "Please enter a valid Email address" });
            errorCount++;
        }
        if (!this.passwordValidator(this.state.password)) {
            this.setState({ error_password: "Invalid Password Format ( only '.' , '@' , '_' , a-z, A-Z , 0-9 are allowed. Min Length = 8 )" });
            errorCount++;
        }
        if (!this.usernameValidator(this.state.username)) {
            this.setState({ error_username: "Invalid Username Format ( only '_' , '-' , a-z , A-Z, 0-9 are allowed. Min Length = 4 )" });
            errorCount++;
        }
        if (!this.regionValidator(this.state.region)) {
            this.setState({ error_region: "Please enter your Region" })
        }

        if (errorCount) return false;
        else return true;
    }

    emailValidator = email => {
        const pattern = /[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9._-]{3,}[.]{1}[a-zA-Z0-9._-]{2,}/;
        if (email === "" || !pattern.test(email)) return false;
        return true;
    };

    passwordValidator = password => {
        if (password === "" || !/[a-zA-Z0-9._@]{8,}/.test(password)) return false;
        return true;
    };

    usernameValidator = username => {
        if (username === "" || !/^[a-zA-Z0-9_-]{4,}$/.test(username)) return false;
        return true;
    };

    regionValidator = region => {
        if (region === "") return false;
        else return true;
    }


    render() {
        return (
            <div>
                <h1>Register</h1>
                <div className="ui vertical segment"></div>
                <Form error style={{ marginTop: '20px' }}>
                    <Form.Field
                        label="Email"
                        name='email'
                        control={Input}
                        value={this.state.email}
                        onChange={this.onInputChange}
                        placeholder='Email'
                    />
                    <Message
                        error
                        content={this.state.error_email}
                    />
                    <Form.Field
                        label="Username"
                        name='username'
                        control={Input}
                        value={this.state.username}
                        onChange={this.onInputChange}
                        placeholder='Username'
                    />
                    <Message
                        error
                        content={this.state.error_username}
                    />
                    <Form.Field
                        label="Password"
                        name='password'
                        control={Input}
                        value={this.state.password}
                        onChange={this.onInputChange}
                        type='password'
                        placeholder='Password'
                    />
                    <Message
                        error
                        content={this.state.error_password}
                    />
                    <Form.Field
                        label="Region"
                        name='region'
                        control={Input}
                        value={this.state.region}
                        onChange={this.onInputChange}
                        placeholder='Region'
                    />
                    <Message
                        error
                        content={this.state.error_region}
                    />
                    <Button type='submit' onClick={this.onSubmit}>
                        Submit
                    </Button>
                </Form>
            </div >
        );
    }
}

export default Register;