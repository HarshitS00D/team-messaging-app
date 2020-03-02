import React from 'react';
import { Input, Button, Icon, Segment, Popup, Dimmer, Form, Message } from 'semantic-ui-react';
import axios from 'axios';
import MessageList from './messageList';
import socket from '../socket';

class ChatBox extends React.Component {
	state = {
		addUsername: '',
		addMessage: 'Add User',
		message: '',
		messages: []
	};

	constructor(props) {
		super(props);
		this.state.selectedChannel = props.selectedChannel;
	}

	handleOpen = () => this.setState({ active: true });
	handleClose = () => this.setState({ active: false, addUsername: '', addMessage: 'Add User' });

	onInputChange = (e, { name, value }) => {
		this.setState({ [name]: value, addMessage: 'Add User' });
	};

	onAddPeople = () => {
		this.handleOpen();
	};

	onAddPeopleSubmit = async () => {
		let res = await axios.post('http://localhost:4000/user/addUser', {
			username: this.state.addUsername,
			channelId: this.state.selectedChannel._id
		});
		this.setState({ addMessage: res.data.message });
		//console.log(res);
	};

	sendMessage = (event) => {
		event.preventDefault();

		if (this.state.message) {
			//console.log(this.state.message);
			socket.emit(
				'new_message',
				this.state.message,
				this.props.user.username,
				this.state.selectedChannel._id,
				() => this.setState({ message: '' })
			);
		} //else console.log('empty');
	};

	componentDidMount = () => {
		socket.emit('join', {
			userId: this.props.user._id,
			username: this.props.user.username,
			channelId: this.state.selectedChannel._id
		});

		socket.on('new_message_broadcast', (message) => {
			this.setState({ messages: [ ...this.state.messages, message ] });
			//console.log(message);
		});
	};

	// componentDidUpdate = (prevProps) => {
	// 	console.log(prevProps, this.props);
	// 	if (prevProps.selectedChannel._id !== this.state.selectedChannel._id) {
	// 		this.setState({ messages: [] });
	// 	}
	// };

	static getDerivedStateFromProps = (props, state) => {
		if (props.selectedChannel._id !== state.selectedChannel._id) {
			socket.emit('join', {
				userId: props.user._id,
				username: props.user.username,
				channelId: props.selectedChannel._id
			});
			return { messages: [], selectedChannel: props.selectedChannel };
		}
		return state;
	};

	componentWillUnmount = () => {
		socket.emit('disconnect');
		socket.off();
	};

	render() {
		const { active } = this.state;

		if (!this.state.selectedChannel) return <div />;
		else
			return (
				<div>
					<Dimmer active={active} onClickOutside={this.handleClose} page>
						<Form style={{ width: '500px' }}>
							<Message info content={this.state.addMessage} />
							<Form.Field
								name="addUsername"
								control={Input}
								value={this.state.addUsername}
								placeholder="Enter Username"
								onChange={this.onInputChange}
							/>
							<Button primary onClick={this.onAddPeopleSubmit}>
								{' '}
								Add{' '}
							</Button>
						</Form>
					</Dimmer>
					<div style={{ position: 'absolute', top: '10px', width: '96%' }}>
						<Segment>
							{this.state.selectedChannel.name}
							<Popup
								content="add people"
								trigger={
									<Button
										circular
										icon="add"
										style={{ float: 'right', padding: '5px' }}
										onClick={this.onAddPeople}
									/>
								}
								inverted
								offset="0, 20px"
								position="bottom center"
							/>
						</Segment>
					</div>
					<div>
						<MessageList messages={this.state.messages} />
					</div>
					<div style={{ position: 'absolute', bottom: '10px', width: '100%' }}>
						<Input
							name="message"
							placeholder="Message..."
							value={this.state.message}
							onChange={this.onInputChange}
							onKeyPress={(event) => (event.key === 'Enter' ? this.sendMessage(event) : null)}
							style={{ width: '80%', float: 'left' }}
						/>
						<Button
							primary
							icon
							style={{ width: '15%', float: 'left', marginLeft: '10px' }}
							onClick={this.sendMessage}
						>
							SEND
							<Icon name="angle double right" />
						</Button>
					</div>
				</div>
			);
	}
}

export default ChatBox;
