import { Meteor } from 'meteor/meteor';
import sendSMS from './smsController';

/* POST method */
const sendSMS_afterRefunded = (params, req, res, next) => {
    try {
        const { bookingNo, phoneNo } = req.body;
        const msg = `Refund to bookingNo ${bookingNo} has been successfully processed. If you have further questions please contact us at 090-562-2019 or www.facebook.com/nj.phuyaipu`;

        sendSMS(phoneNo, msg); 
        res.end();
    } catch (err) {
        console.log(err);
        next();
    }
};

module.exports = {
    sendSMS_afterRefunded
};