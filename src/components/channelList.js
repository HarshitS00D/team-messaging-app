import React from 'react';
import { Item } from 'semantic-ui-react';
import ChannelItem from './channelItem';

const ChannelList = ({ channels, onChannelSelect }) => {
	const renderedList = channels.map((channel) => {
		return <ChannelItem key={channel._id} channel={channel} onChannelSelect={onChannelSelect} />;
	});

	return <Item.Group divided>{renderedList}</Item.Group>;
};

export default ChannelList;
