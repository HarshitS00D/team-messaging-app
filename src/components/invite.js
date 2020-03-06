import React from 'react';
import axios from '../axios';
import InviteList from './inviteList';
import { Segment } from 'semantic-ui-react';

class Invite extends React.Component {
	state = {
		invites: []
	};

	componentDidMount = async () => {
		let result = await axios.get(`/user/get-invites?username=${this.props.user.username}`);
		if (result.data.length) {
			this.setState({ invites: result.data });
		}
	};

	acceptInvite = async (id) => {
		let res = await axios.post('/user/accept-invite', { id, username: this.props.user.username });

		if (res.data.ok === 1) {
			let array = this.state.invites;
			let index = array.findIndex((obj) => obj._id === id);
			array.splice(index, 1);
			this.setState({ invites: array });
		}
	};

	declineInvite = async (id) => {
		let res = await axios.post('/user/decline-invite', { id });

		if (res.data.ok === 1) {
			let array = this.state.invites;
			let index = array.findIndex((obj) => obj._id === id);
			array.splice(index, 1);
			this.setState({ invites: array });
		}
	};

	render() {
		return (
			<Segment style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
				{this.state.invites.length ? (
					<InviteList
						acceptInvite={this.acceptInvite}
						declineInvite={this.declineInvite}
						invites={this.state.invites}
					/>
				) : (
					<div style={{ textAlign: 'center', fontSize: '12px', color: 'grey' }}> NO INVITES</div>
				)}
			</Segment>
		);
	}
}

export default Invite;
