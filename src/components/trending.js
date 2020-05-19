import React from 'react';
import axios from '../axios';
import { Segment, Header, Table, Icon } from 'semantic-ui-react';

class Trending extends React.Component {
	state = {
		channels: [],
		users: []
	};

	componentDidMount = async () => {
		let result = await axios.get('/trending');
		if (result.data.length) {
			this.setState({ channels: result.data });
		}

		result = await axios.get('trending/users');
		if (result.data.length) {
			this.setState({ users: result.data });
		}
	};

	render() {
		return (
			<Segment style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
				<Header as="h2">Top 5 Channels </Header>
				{this.state.channels.length ? (
					<Table singleLine>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell width="5"> Ranking </Table.HeaderCell>
								<Table.HeaderCell width="5"> Channel Name </Table.HeaderCell>
								<Table.HeaderCell width="5"> Description </Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{this.state.channels.map((channel, i) => {
								return (
									<Table.Row key={i}>
										<Table.Cell>
											<Header as="h2" textAlign="center">
												{++i}
												<Icon name="chess queen" size="mini" color="yellow" />
											</Header>
										</Table.Cell>
										<Table.Cell>{channel.name}</Table.Cell>
										<Table.Cell>{channel.description}</Table.Cell>
									</Table.Row>
								);
							})}
						</Table.Body>
					</Table>
				) : (
					<div style={{ height: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<div style={{ fontSize: '12px', color: 'grey' }}> NO DATA AVAILABLE</div>
					</div>
				)}
				<Header as="h2">Top 5 Users </Header>
				{this.state.users.length ? (
					<Table singleLine>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell width="5"> Ranking </Table.HeaderCell>
								<Table.HeaderCell width="5"> Username </Table.HeaderCell>
								<Table.HeaderCell width="5"> Posts Count </Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{this.state.users.map((user, i) => {
								return (
									<Table.Row key={i}>
										<Table.Cell>
											<Header as="h2" textAlign="center">
												{++i}
												<Icon name="chess queen" size="mini" color="yellow" />
											</Header>
										</Table.Cell>
										<Table.Cell>{user._id}</Table.Cell>
										<Table.Cell>{user.count}</Table.Cell>
									</Table.Row>
								);
							})}
						</Table.Body>
					</Table>
				) : (
					<div style={{ height: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<div style={{ fontSize: '12px', color: 'grey' }}> NO DATA AVAILABLE</div>
					</div>
				)}
			</Segment>
		);
	}
}

export default Trending;
