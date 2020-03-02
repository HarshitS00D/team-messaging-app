import React from 'react';
import { Item } from 'semantic-ui-react';

const MessageItem = ({ message }) => {
    return (
        <Item>
            <Item.Content> {message}</Item.Content>
        </Item>
    )
}

export default MessageItem;