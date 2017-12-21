const accountSid = 'AC659a388bd3cf4917e7bfce29c98bf534';
const authToken = '4f6c2a0bbf0c02287444c021772267f9';

const client = require('twilio')(accountSid, authToken);

client.messages.create({
    to: '+18587752036',
    from:'+16193542930 ',
    body:'Twilio sms test'
}).then((message) => console.log(message.sid));