import React from 'react';
import { Item } from 'semantic-ui-react';
import ScrollToBottom from 'react-scroll-to-bottom';

const MessageList = ({ messages }) => {
	return (
		<ScrollToBottom mode="bottom">
			<Item.Group divided>
				{messages.map((message, i) => {
					return (
						<Item key={i}>
							<Item.Content>
								<b style={{ color: '#316991' }}> {message.username} </b> : {message.text}
							</Item.Content>
						</Item>
					);
				})}
			</Item.Group>
		</ScrollToBottom>
	);
};

export default MessageList;
