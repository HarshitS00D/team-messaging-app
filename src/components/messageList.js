import React from 'react';
import MessageItem from './messageItem';
import { Item } from 'semantic-ui-react';

const MessageList = ({ messages }) => {
    const renderedList = messages.map(message => {
        return (
            <MessageItem
                message={message}
            />
        );
    });

    return <Item.Group divided>{renderedList} </Item.Group>

}

export default MessageList;