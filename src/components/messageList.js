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
								<Icon name="user outline" /> <b> {message.username} </b>
								<Label size="small" style={{ marginLeft: '10px', right: '10px', position: 'absolute' }}>
									{message.timestamp}
								</Label>
							</div>
							<div style={{ fontSize: '16px' }}>{message.message}</div>
						</Item.Content>
					</Item>
				);
			})}
		</Item.Group>
	);
};

export default MessageList;
