import React from 'react';
import { Item } from 'semantic-ui-react';

const MessageList = ({ messages }) => {
	return (
		<Item.Group divided>
			{messages.map((message, i) => {
				return (
					<Item key={i}>
						<Item.Content> {message.text}</Item.Content>
					</Item>
				);
			})}
		</Item.Group>
	);
};

export default MessageList;
