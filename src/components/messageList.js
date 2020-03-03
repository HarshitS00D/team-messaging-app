import React from 'react';
import { Item, Label, Icon } from 'semantic-ui-react';

const MessageList = ({ messages }) => {
	return (
		<Item.Group divided>
			{messages.map((message, i) => {
				return (
					<Item key={i}>
						<Item.Content>
							<div style={{ color: '#112d4e', fontSize: '16px', marginBottom: '10px' }}>
								<Icon name="user outline small" /> <b> {message.username} </b>
							</div>
							{message.message}
							<Label size="mini" style={{ marginLeft: '10px' }}>
								{message.timestamp}
							</Label>
						</Item.Content>
					</Item>
				);
			})}
		</Item.Group>
	);
};

export default MessageList;
