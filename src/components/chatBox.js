import React, { useState, useEffect } from 'react';
import { Input, Button, Icon, Segment, Popup, Dimmer, Form, Message } from 'semantic-ui-react';
import axios from 'axios';
import io from 'socket.io-client';
import MessageList from './messageList';

let socket;


class ChatBox extends React.Component {
    state = {
        addUsername: '',
        addMessage: 'Add User',
        message: '',
        messages: []
    }

    handleOpen = () => this.setState({ active: true })
    handleClose = () => this.setState({ active: false, addUsername: '', addMessage: 'Add User' })

    onInputChange = (e, { name, value }) => {
        this.setState({ [name]: value, addMessage: 'Add User' });
    }

    onAddPeople = () => {
        this.handleOpen();
    }

    onAddPeopleSubmit = async () => {
        let res = await axios.post('https://team-messaging-api.herokuapp.com/user/addUser', { username: this.state.addUsername, channelId: this.props.selectedChannel._id })
        this.setState({ addMessage: res.data.message })
        console.log(res);
    }

    sendMessage = (event) => {
        event.preventDefault();

        if (this.state.message) {
            console.log(this.state.message);
            socket.emit('sendMessage', this.state.message, () => this.setState({ message: '' }));
        }
        else console.log('empty');

    }

    componentDidMount = () => {
        console.log("mounted");
        socket = io('https://team-messaging-api.herokuapp.com');
        socket.emit('join', { userId: this.props.user._id, username: this.props.user.username, channelId: this.props.selectedChannel._id }, () => {

        });

        socket.on('message', (message) => {
            this.setState({ messages: [...this.state.messages, message.text] });
            console.log(message);
        });

    }

    componentDidUpdate = (prevProps, prevState) => {
        // if (prevState.messages === this.state.messages) {
        //     socket.on('message', (message) => {
        //         this.setState({ messages: [...this.state.messages, message] });
        //         console.log(message);
        //     });
        // }

        // socket.on('message', (message) => {
        //     this.setState({ messages: [...this.state.messages, message] });
        //     console.log(message);
        // });

    }



    componentWillUnmount = () => {
        socket.emit('disconnect');
        socket.off();
    }


    render() {
        const { active } = this.state;


        if (!this.props.selectedChannel)
            return <div></div>;
        else return (
            <div>
                <Dimmer active={active} onClickOutside={this.handleClose} page>
                    <Form style={{ width: '500px' }}>
                        <Message info content={this.state.addMessage} />
                        <Form.Field
                            name='addUsername'
                            control={Input}
                            value={this.state.addUsername}
                            placeholder='Enter Username'
                            onChange={this.onInputChange}
                        />
                        <Button primary onClick={this.onAddPeopleSubmit}> Add </Button>
                    </Form>
                </Dimmer>
                <div style={{ position: 'absolute', top: '10px', width: '96%' }}>
                    <Segment>
                        {this.props.selectedChannel.name}
                        <Popup
                            content='add people'
                            trigger={
                                <Button
                                    circular
                                    icon='add'
                                    style={{ float: 'right', padding: '5px' }}
                                    onClick={this.onAddPeople}
                                />}
                            inverted
                            offset='0, 20px'
                            position='bottom center'
                        />
                    </Segment>
                </div>
                <div>
                    <MessageList messages={this.state.messages} />
                </div>
                <div style={{ position: 'absolute', bottom: '10px', width: '100%' }}>
                    <Input
                        name='message'
                        placeholder='Message...'
                        value={this.state.message}
                        onChange={this.onInputChange}
                        onKeyPress={event => event.key === 'Enter' ? this.sendMessage(event) : null}
                        style={{ width: '80%', float: 'left' }}
                    />
                    <Button
                        primary icon style={{ width: '15%', float: 'left', marginLeft: '10px' }}
                        onClick={event => this.sendMessage(event)}
                    >
                        SEND
                        <Icon name='angle double right' />
                    </Button>
                </div>
            </div>
        );
    }
}

// const ChatBox = ({ selectedChannel, user }) => {
//     const [addUsername, setAddUsername] = useState('');
//     const [addMessage, setAddMessage] = useState('Add User');
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     const [active, setActive] = useState(false);



//     const handleOpen = () => setActive(true);
//     const handleClose = () => { setActive(false); setAddUsername(''); setAddMessage('Add User'); }

//     const onAddPeople = () => {
//         handleOpen();
//     }

//     const onAddPeopleSubmit = async () => {
//         let res = await axios.post('http://localhost:4000/user/addUser', { username: addUsername, channelId: selectedChannel._id })
//         setAddMessage(res.data.message);
//         console.log(res);
//     }

//     useEffect(() => {
//         if (selectedChannel) {
//             socket = io('localhost:4000');

//             socket.emit('join', { userId: user._id, username: user.username, channelId: selectedChannel._id }, () => {

//             });

//             return () => {
//                 socket.emit('disconnect');
//                 socket.off();
//             }
//         }
//     }, [selectedChannel]);

//     useEffect(() => {
//         if (selectedChannel) {
//             socket.on('message', (message) => {
//                 this.setState({ messages: [...this.state.messages, message] });
//                 console.log(message);
//             });
//         }
//     }, [messages]);

//     const sendMessage = (event) => {
//         event.preventDefault();

//         if (message) {
//             socket.emit('sendMessage', message, () => setMessage(''));
//         }
//         else console.log('empty');

//     }



//     if (!selectedChannel)
//         return <div></div>;
//     else return (
//         <div>
//             <Dimmer active={active} onClickOutside={handleClose} page>
//                 <Form style={{ width: '500px' }}>
//                     <Message info content={addMessage} />
//                     <Form.Field
//                         name='addUsername'
//                         control={Input}
//                         value={addUsername}
//                         placeholder='Enter Username'
//                         onChange={(event) => setAddUsername(event.target.value)}
//                     />
//                     <Button primary onClick={onAddPeopleSubmit}> Add </Button>
//                 </Form>
//             </Dimmer>
//             <div style={{ position: 'absolute', top: '10px', width: '96%' }}>
//                 <Segment>
//                     {selectedChannel.name}
//                     <Popup
//                         content='add people'
//                         trigger={
//                             <Button
//                                 circular
//                                 icon='add'
//                                 style={{ float: 'right', padding: '5px' }}
//                                 onClick={onAddPeople}
//                             />}
//                         inverted
//                         offset='0, 20px'
//                         position='bottom center'
//                     />
//                 </Segment>
//             </div>
//             <div style={{ position: 'absolute', bottom: '10px', width: '100%' }}>
//                 <Input
//                     name='message'
//                     placeholder='Message...'
//                     value={message}
//                     onChange={(event) => setMessage(event.target.value)}
//                     onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
//                     style={{ width: '80%', float: 'left' }}
//                 />
//                 <Button
//                     primary icon style={{ width: '15%', float: 'left', marginLeft: '10px' }}
//                     onClick={event => sendMessage(event)}
//                 >
//                     SEND
//                             <Icon name='angle double right' />
//                 </Button>
//             </div>
//         </div>
//     );
//     //return <div>hello </div>
// }



export default ChatBox;
