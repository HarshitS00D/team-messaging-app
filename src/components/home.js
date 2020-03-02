import React from 'react';
import { Button, Dimmer, Segment, Form, Icon, Input, Header, Loader } from 'semantic-ui-react';
import ChannelList from './channelList';
import ChatBox from './chatBox';
import axios from 'axios';
import history from '../history';

class Home extends React.Component {
    state = {
        isLoading: true,
        user: {},
        user_id: sessionStorage.getItem('userid'),
        isLogged: false,
        channels: [],
        selectedChannel: null,
        newChannelName: '',
        newChannelDescription: ''
    }

    handleOpen = () => this.setState({ active: true })
    handleClose = () => this.setState({ active: false })

    onInputChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    }

    onCreateChannel = () => {
        this.handleOpen();
    }

    onCreateChannelSubmit = async () => {
        let res = await axios.post('https://team-messaging-api.herokuapp.com/create-channel', { name: this.state.newChannelName, description: this.state.newChannelDescription, createdBy: this.state.user_id })
        this.setState({ newChannelName: '', newChannelDescription: '' });
        this.handleClose();
        this.getChannels();
        console.log(res);
    }

    onChannelSelect = channel => {
        this.setState({ selectedChannel: channel });
    }

    getChannels = async () => {
        let res = await axios.get(`https://team-messaging-api.herokuapp.com/user/get-channels?id=${this.state.user_id}`);
        this.setState({ channels: res.data });
    }

    logout() {
        sessionStorage.removeItem('userid');
        history.push('/login');

    }

    componentDidMount = async () => {
        if (this.state.user_id) {

            let res = await axios.get(`https://team-messaging-api.herokuapp.com/get-user?id=${this.state.user_id}`);
            if (res.data) {
                this.setState({ user: res.data, isLogged: true, isLoading: false });
                this.getChannels();
            }
            else {
                this.setState({ isLoading: false });
            }
        }
        else {
            this.setState({ isLoading: false });
        }

    }

    render() {
        const { active } = this.state;

        if (this.state.isLoading && !this.state.isLogged)
            return (
                <Dimmer active>
                    <Loader />
                </Dimmer>
            )
        else if (this.state.isLogged && !this.state.isLoading)
            return (

                <div style={{ marginTop: '100px' }}>

                    <Segment style={{ height: '80px' }}>

                        <Header style={{ float: 'left' }}> Welcome, {this.state.user.username} </Header>
                        <Button icon='log out' onClick={this.logout} style={{ position: 'absolute', right: '10px' }} />
                    </Segment>

                    <Button primary animated onClick={this.onCreateChannel} style={{ display: 'block' }}>
                        <Button.Content visible> Create Channel </Button.Content>
                        <Button.Content hidden>
                            <Icon name='add' />
                        </Button.Content>
                    </Button>

                    <Dimmer active={active} onClickOutside={this.handleClose} page>
                        <Form style={{ width: '500px' }}>
                            <Form.Field
                                name='newChannelName'
                                control={Input}
                                value={this.state.newChannelName}
                                placeholder='Channel Name'
                                onChange={this.onInputChange}
                            />
                            <Form.Field
                                name='newChannelDescription'
                                control={Input}
                                value={this.state.newChannelDescription}
                                placeholder='Channel Description'
                                onChange={this.onInputChange}
                            />
                            <Button primary onClick={this.onCreateChannelSubmit}> Create </Button>
                        </Form>
                    </Dimmer>

                    <Segment.Group compact style={{ width: '30%', height: '600px', float: 'left' }}>
                        <Segment placeholder>
                            <ChannelList
                                channels={this.state.channels}
                                onChannelSelect={this.onChannelSelect}
                            />
                        </Segment>
                    </Segment.Group>

                    <Segment placeholder style={{ width: '70%', height: '600px', float: 'left' }}>
                        {this.state.selectedChannel ?
                            (<ChatBox
                                selectedChannel={this.state.selectedChannel}
                                user={this.state.user}
                            />
                            ) : (null)}

                    </Segment>
                </div>
            );
        else return (
            <div> Please Login or Signup First</div>
        )
    }
};

export default Home;
