import React from 'react';
import { Item, Label } from 'semantic-ui-react';
import ScrollToBottom from 'react-scroll-to-bottom';

const MessageList = ({ messages }) => {
	return (
		<ScrollToBottom mode="bottom">
			<Item.Group divided>
				{messages.map((message, i) => {
					return (
						<Item key={i}>
							<Item.Content>
								<b style={{ color: '#316991' }}> {message.username} </b> : {message.message}
								<Label size="mini" style={{ marginLeft: '10px' }}>
									{' '}
									{message.timestamp}{' '}
								</Label>
							</Item.Content>
						</Item>
					);
				})}
			</Item.Group>
		</ScrollToBottom>
	);
};

export default MessageList;
