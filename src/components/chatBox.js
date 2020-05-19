import React from 'react';
import {
	Input,
	Button,
	Icon,
	Segment,
	Popup,
	Dimmer,
	Form,
	Message,
	Dropdown,
	List,
	Header,
	Container
} from 'semantic-ui-react';
import axios from '../axios';
import MessageList from './messageList';
import socket from '../socket';
import { animateScroll } from 'react-scroll';

class ChatBox extends React.Component {
	state = {
		addUsername: '',
		addMessage: 'Add User',
		message: '',
		messages: [],
		isProcessing: false
	};

	constructor(props) {
		super(props);
		this.state.selectedChannel = props.selectedChannel;
	}

	handleOpen = () => this.setState({ active: true });
	handleClose = () => this.setState({ active: false, addUsername: '', addMessage: 'Add User' });

	handleOpenForChannelInfo = () => this.setState({ activeChannelInfo: true });
	handleCloseForChannelInfo = () => this.setState({ activeChannelInfo: false });

	onInputChange = (e, { name, value }) => {
		this.setState({ [name]: value, addMessage: 'Add User' });
	};

	onAddPeople = () => {
		this.handleOpen();
	};

	onShowChannelInfo = () => {
		this.handleOpenForChannelInfo();
	};

	onAddPeopleSubmit = async () => {
		if (this.state.addUsername) {
			this.setState({ isProcessing: true });
			let res = await axios.post('/user/invite', {
				username: this.state.addUsername,
				channelId: this.state.selectedChannel._id,
				channelName: this.state.selectedChannel.name,
				sentBy: this.props.user.username
			});
			this.setState({ addMessage: res.data.message, isProcessing: false });
		} else {
			this.setState({ addMessage: 'Enter a Username' });
		}
	};

	scrollToBottom = () => {
		animateScroll.scrollToBottom({
			containerId: 'MessageList'
		});
	};

	sendMessage = (event) => {
		event.preventDefault();

		if (this.state.message) {
			socket.emit(
				'new_message',
				this.state.message,
				this.props.user.username,
				this.state.selectedChannel._id,
				() => this.setState({ message: '' })
			);
		}
	};

	componentDidMount = () => {
		this.scrollToBottom();

		axios.get(`/user/get-posts?channelId=${this.state.selectedChannel._id}`).then((result) => {
			this.setState({ messages: result.data });
		});

		socket.emit('join', {
			userId: this.props.user._id,
			username: this.props.user.username,
			channelId: this.state.selectedChannel._id
		});

		socket.on('new_message_broadcast', (message) => {
			this.setState({ messages: [ ...this.state.messages, message ] });
		});
	};

	componentDidUpdate = (prevProps, prevState) => {
		this.scrollToBottom();
		if (prevState.selectedChannel._id !== this.state.selectedChannel._id) {
			axios.get(`/user/get-posts?channelId=${this.state.selectedChannel._id}`).then((result) => {
				this.setState({ messages: result.data });
			});
		}
	};

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
		const { active, activeChannelInfo } = this.state;

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
							{this.state.isProcessing ? (
								<Button loading positive onClick={this.onAddPeopleSubmit}>
									ADD
								</Button>
							) : (
								<Button positive onClick={this.onAddPeopleSubmit}>
									ADD
								</Button>
							)}
						</Form>
					</Dimmer>
					<Dimmer active={activeChannelInfo} onClickOutside={this.handleCloseForChannelInfo} page>
						<div style={{ width: '500px' }}>
							<Message info header="Channel Info" content={this.state.selectedChannel.description} />
							<Segment>
								<List animated divided style={{ height: '600px', overflow: 'auto' }}>
									<Header as="h3" dividind style={{ color: 'teal' }}>
										Members
									</Header>
									{this.state.selectedChannel.members.map((member, i) => {
										return (
											<List.Item key={i} style={{ padding: '10px' }}>
												<Icon color="blue" name="user circle" size="large" />
												<List.Content as="h3" style={{ textAlign: 'initial' }}>
													{this.state.selectedChannel.createdBy === member.username ? (
														<List.Header>
															{member.username + ' '}
															<span style={{ color: 'red', fontWeight: 'normal' }}>
																(admin)
															</span>
														</List.Header>
													) : (
														<List.Header> {member.username} </List.Header>
													)}
												</List.Content>
											</List.Item>
										);
									})}
								</List>
							</Segment>
						</div>
					</Dimmer>
					<Container style={{ position: 'absolute', top: '10px', width: '98%' }}>
						<Segment style={{ backgroundColor: '#3f72af', color: 'white', fontSize: '18px' }}>
							<b> {this.state.selectedChannel.name} </b>
							<Dropdown icon="bars" floating labeled style={{ float: 'right' }}>
								<Dropdown.Menu direction="left">
									<Dropdown.Item onClick={this.onShowChannelInfo}> Channel Info </Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							{this.state.selectedChannel.createdBy === this.props.user.username ? (
								<Popup
									content="add people"
									trigger={
										<Icon
											name="add"
											style={{
												float: 'right',
												marginRight: '10px'
											}}
											onClick={this.onAddPeople}
										/>
									}
									inverted
									offset="0, 20px"
									position="bottom center"
								/>
							) : null}
						</Segment>
					</Container>
					<div
						id="MessageList"
						style={{
							top: '80px',
							height: '75%',
							width: '96%',
							position: 'absolute',
							overflow: 'auto'
						}}
					>
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
							positive
							icon
							style={{
								position: 'absolute',
								right: '30px',
								width: '15%',
								color: 'white'
							}}
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
