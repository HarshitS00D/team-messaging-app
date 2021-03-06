import React from 'react';
import { Button, Dimmer, Segment, Form, Icon, Input, Loader, Message, Popup } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ChannelList from './channelList';
import ChatBox from './chatBox';
import Invite from './invite';
import Trending from './trending';
import SideBar from './sidebar';
import axios from '../axios';
import history from '../history';

class Home extends React.Component {
	state = {
		isLoading: true,
		user: {},
		user_id: sessionStorage.getItem('userid'),
		isLogged: false,
		channels: [],
		selectedChannel: null,
		newChannelMessage: 'Create Channel',
		newChannelName: '',
		newChannelDescription: '',
		activeTab: 1,
		isProcessing: false
	};

	handleOpen = () => this.setState({ active: true });
	handleClose = () => this.setState({ active: false });

	onInputChange = (e, { name, value }) => {
		this.setState({ [name]: value, newChannelMessage: 'Create Channel' });
	};

	logout() {
		sessionStorage.removeItem('userid');
		history.push('/login');
	}

	onCreateChannel = () => {
		this.handleOpen();
	};

	changeActiveTab = (tab) => {
		this.setState({ activeTab: tab });
	};

	onCreateChannelSubmit = async () => {
		if (this.state.newChannelName && this.state.newChannelDescription) {
			this.setState({ isProcessing: true });
			await axios.post('/create-channel', {
				name: this.state.newChannelName,
				description: this.state.newChannelDescription,
				createdBy: this.state.user.username
			});
			this.setState({ newChannelName: '', newChannelDescription: '' });
			this.handleClose();
			this.getChannels();
			this.setState({ isProcessing: false });
		} else {
			this.setState({ newChannelMessage: 'Enter Channel Name & Channel Description' });
		}
	};

	onChannelSelect = (channel) => {
		this.setState({ selectedChannel: channel });
	};

	getChannels = async () => {
		let res = await axios.get(`/user/get-channels?id=${this.state.user_id}`);
		this.setState({ channels: res.data });
	};

	leaveChannel = (channel) => {
		let channelIndex = this.state.channels.findIndex((x) => x._id === channel._id);
		let channels = this.state.channels;
		channels.splice(channelIndex, 1);
		this.setState({ channels, selectedChannel: null });
	};

	componentDidMount = async () => {
		if (this.state.user_id) {
			let res = await axios.get(`/get-user?id=${this.state.user_id}`);
			if (res.data) {
				this.setState({ user: res.data, isLogged: true, isLoading: false });
				this.getChannels();
			} else {
				this.setState({ isLoading: false });
			}
		} else {
			this.setState({ isLoading: false });
		}
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (prevState.activeTab !== this.state.activeTab) {
			this.getChannels();
		}
	};

	render() {
		const { active } = this.state;

		if (this.state.isLoading && !this.state.isLogged)
			return (
				<Dimmer active>
					<Loader />
				</Dimmer>
			);
		else if (this.state.isLogged && !this.state.isLoading)
			return (
				<div style={{ marginTop: '20px' }}>
					<SideBar user={this.state.user} changeActiveTab={this.changeActiveTab} logout={this.logout} />

					{
						{
							1: (
								<div style={{ height: '700px', width: '90%', float: 'left' }}>
									<Dimmer active={active} onClickOutside={this.handleClose} page>
										<Form style={{ width: '500px' }}>
											<Message info content={this.state.newChannelMessage} />
											<Form.Field
												name="newChannelName"
												control={Input}
												value={this.state.newChannelName}
												placeholder="Channel Name"
												onChange={this.onInputChange}
											/>
											<Form.Field
												name="newChannelDescription"
												control={Input}
												value={this.state.newChannelDescription}
												placeholder="Channel Description"
												onChange={this.onInputChange}
											/>
											{this.state.isProcessing ? (
												<Button loading positive onClick={this.onCreateChannelSubmit}>
													CREATE
												</Button>
											) : (
												<Button positive onClick={this.onCreateChannelSubmit}>
													CREATE
												</Button>
											)}
										</Form>
									</Dimmer>

									<Segment.Group
										compact
										style={{
											backgroundColor: '#fff',
											width: '25%',
											float: 'left',
											height: '700px'
										}}
									>
										<div
											style={{
												display: 'flex',
												height: '80px',
												alignItems: 'center'
											}}
										>
											<div
												style={{
													position: 'absolute',
													left: '30px',
													fontWeight: 'bold',
													fontSize: '22px',
													color: '#3f72af'
												}}
											>
												CHANNELS
											</div>
											<Popup
												content="create channel"
												trigger={
													<Button
														circular
														onClick={this.onCreateChannel}
														style={{
															position: 'absolute',
															right: '20px'
														}}
													>
														<Icon name="add" style={{ margin: '0px' }} />
													</Button>
												}
												inverted
												offset="10px, 20px"
												position="bottom center"
											/>
										</div>
										{this.state.channels.length ? (
											<Segment
												style={{
													backgroundColor: '#fff',
													overflow: 'auto'
												}}
											>
												<ChannelList
													channels={this.state.channels}
													onChannelSelect={this.onChannelSelect}
												/>
											</Segment>
										) : (
											<div
												style={{
													height: '700px',
													width: '100%',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center'
												}}
											>
												<div
													style={{
														fontSize: '12px',
														color: 'grey'
													}}
												>
													NO CHANNEL TO DISPLAY
												</div>
											</div>
										)}
									</Segment.Group>

									<Segment
										placeholder
										style={{
											backgroundColor: '#fff',
											width: '75%',
											margin: '0px',
											height: '700px',
											float: 'left'
										}}
									>
										{this.state.selectedChannel ? (
											<ChatBox
												leaveChannel={this.leaveChannel}
												selectedChannel={this.state.selectedChannel}
												user={this.state.user}
											/>
										) : (
											<div
												style={{
													fontSize: '12px',
													display: 'flex',
													justifyContent: 'center',
													color: 'grey'
												}}
											>
												NO CHANNEL SELECTED
											</div>
										)}
									</Segment>
								</div>
							),
							2: (
								<div
									style={{
										height: '700px',
										width: '90%',
										float: 'left'
									}}
								>
									<Invite user={this.state.user} />
								</div>
							),
							3: (
								<div
									style={{
										height: '700px',
										width: '90%',
										float: 'left'
									}}
								>
									<Trending />
								</div>
							)
						}[this.state.activeTab]
					}
				</div>
			);
		else return <Redirect to="/login" />;
	}
}

export default Home;
