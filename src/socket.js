import io from 'socket.io-client';

// eslint-disable-next-line
const apiURL = 'https://team-messaging-api.herokuapp.com';
// eslint-disable-next-line
const localURL = window.location.protocol + '//' + window.location.hostname + ':' + 4000;

const URL = window.location.hostname === 'localhost' ? localURL : apiURL;
export default io(URL);
