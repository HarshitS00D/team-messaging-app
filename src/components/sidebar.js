import React from 'react';
import { Button, Icon, Segment, Image } from 'semantic-ui-react';

class SideBar extends React.Component {
	render() {
		return (
			<Segment
				style={{
					backgroundColor: '#37474f',
					height: '700px',
					width: '10%',
					float: 'left',
					padding: '0px',
					margin: '0px'
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						height: '200px',
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Image
						circular
						src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
						style={{ height: '150px', padding: '10px' }}
					/>
					<div style={{ color: 'grey' }}>{this.props.user.username}</div>
				</div>
				<Button
					basic
					animated
					onClick={() => this.props.changeActiveTab(1)}
					style={{ color: 'grey', width: '100%', height: '100px', backgroundColor: 'white' }}
				>
					<Button.Content hidden> HOME </Button.Content>
					<Button.Content visible>
						<Icon name="home" size="large" />
					</Button.Content>
				</Button>
				<Button
					basic
					animated
					onClick={() => this.props.changeActiveTab(2)}
					style={{ color: 'grey', width: '100%', height: '100px', backgroundColor: 'white' }}
				>
					<Button.Content hidden> INVITES </Button.Content>
					<Button.Content visible>
						<Icon name="envelope" size="large" />
					</Button.Content>
				</Button>
				<Button
					basic
					animated
					onClick={() => this.props.changeActiveTab(3)}
					style={{ color: 'grey', width: '100%', height: '100px', backgroundColor: 'white' }}
				>
					<Button.Content hidden> TRENDING </Button.Content>
					<Button.Content visible>
						<Icon name="chart line" size="large" />
					</Button.Content>
				</Button>
				<Button
					basic
					animated
					onClick={this.props.logout}
					style={{
						color: 'grey',
						width: '100%',
						height: '100px',
						backgroundColor: 'white',
						position: 'absolute',
						bottom: '0px'
					}}
				>
					<Button.Content hidden> LOGOUT </Button.Content>
					<Button.Content visible>
						<Icon name="log out" size="large" />
					</Button.Content>
				</Button>
			</Segment>
		);
	}
}

export default SideBar;
