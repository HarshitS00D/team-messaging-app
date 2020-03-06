import React from 'react';
import { Item, Icon } from 'semantic-ui-react';

const ChannelItem = ({ channel, onChannelSelect }) => {
	return (
		<Item as="a" onClick={() => onChannelSelect(channel)} style={{ textDecoration: 'none', padding: '20px' }}>
			<Icon name="group" color="grey" />
			<Item.Content style={{ marginLeft: '10px', color: 'black', fontSize: '16px' }}>{channel.name}</Item.Content>
		</Item>
	);
};

export default ChannelItem;
