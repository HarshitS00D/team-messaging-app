import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';

const InviteList = ({ invites, acceptInvite, declineInvite }) => {
	return (
		<Card.Group>
			{invites.map((invite, i) => {
				return (
					<Card key={i}>
						<Card.Content>
							<Card.Header>
								<Image src="https://react.semantic-ui.com/images/avatar/large/patrick.png" avatar />
								{invite.sentBy}
							</Card.Header>
							<Card.Description>
								{invite.sentBy} invited you to join channel <strong> {invite.channelName} </strong>
							</Card.Description>
						</Card.Content>
						<Card.Content extra>
							<div className="ui two buttons">
								<Button basic onClick={() => acceptInvite(invite._id)} color="green">
									Approve
								</Button>
								<Button basic onClick={() => declineInvite(invite._id)} color="red">
									Decline
								</Button>
							</div>
						</Card.Content>
					</Card>
				);
			})}
		</Card.Group>
	);
};

export default InviteList;
