import { Meteor } from 'meteor/meteor';

var request = require('request');

export default sendSMS = (phoneNo, msg) => {
    const accessToken_key = Meteor.settings.thsms.accessToken_key;
  
    const options = {
        'method': 'POST',
        'url': 'https://thsms.com/api/send-sms',
        'headers': { 
            'Authorization': `Bearer ${accessToken_key}`,
            'Content-Type': 'application/json' 
        },
        'body': JSON.stringify({
            "sender": "AGENDA",
            "msisdn": [phoneNo],
            "message": msg
        })
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
    });
};