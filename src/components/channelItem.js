import React from 'react';
import { Item, Icon } from 'semantic-ui-react';

const ChannelItem = ({ channel, onChannelSelect }) => {
    return (
        <Item onClick={() => onChannelSelect(channel)}>
            <Icon name='user circle' />
            <Item.Content style={{ marginLeft: '10px' }}>{channel.name}</Item.Content>
        </Item>
    )
}

export default ChannelItem;