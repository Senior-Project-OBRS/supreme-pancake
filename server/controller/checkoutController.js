import { Meteor } from 'meteor/meteor';
import sendSMS from './smsController';

import { isObjectNotEmpty } from '../../imports/utils/objectUtils';

const omise = require('omise')({
    'publicKey': Meteor.settings.omise.Testing.publicKey,
    'secretKey': Meteor.settings.omise.Testing.secretKey
    // 'publicKey': Meteor.settings.omise.Production.publicKey,
    // 'secretKey': Meteor.settings.omise.Production.secretKey
});

/* POST method */
const checkoutCreditCard = async (params, req, res, next) => {
    const { bookingId, name, phoneNo, amount, token } = req.body;
    try {
        const customer = await omise.customers.create({
            description: name,
            card: token
        });
    
        const charge = await omise.charges.create({
            amount: amount,
            currency: 'thb',
            customer: customer.id,
            return_uri: `http://localhost:3000/bus_schedule/message/${bookingId}`   // Testing
            // return_uri: `https://nj-phuyaipu.meteorapp.com/bus_schedule/message/${bookingId}`    // Production
        });
        
        await Meteor.call('booking.requestCheckout', bookingId, charge);

        res.end( JSON.stringify({
            authorizeUri: charge.authorize_uri
        }) );
    } catch (err) {
        console.error(err);
        next();
    }
};

/* POST method */
const checkoutInternetBanking = async (params, req, res, next) => {
    try { 
        const { bookingId, email, name, phoneNo, amount, token } = req.body;

        const charge = await omise.charges.create({
            source: token,
            amount: amount,
            currency: 'thb',
            return_uri: `http://localhost:3000/bus_schedule/message/${bookingId}`   // Testing
            // return_uri: `https://nj-phuyaipu.meteorapp.com/bus_schedule/message/${bookingId}`    // Production
        });
        
        await Meteor.call('booking.requestCheckout', bookingId, charge);
        
        res.end( JSON.stringify({
            authorizeUri: charge.authorize_uri
        }) );
    } catch (err) {
        console.error(err);
        next();
    }
};

/* POST method */
const checkoutPromptPay = async (params, req, res, next) => {
    try { 
        const { bookingId, email, name, phoneNo, amount, token } = req.body;

        const charge = await omise.charges.create({
            source: token,
            amount: amount,
            currency: 'thb',
        });
        
        await Meteor.call('booking.requestCheckout', bookingId, charge);
        
        res.end( JSON.stringify({
            download_uri: charge.source.scannable_code.image.download_uri
        }) );
    } catch (err) {
        console.error(err);
        next();
    }
};

/* POST method */
const omiseWebHooks = async (params, req, res, next) => {
    try {   
        const { data, key } = req.body;

        if (key === 'charge.complete') {
            if (data.status === 'successful') {
                const charge = data;
                const booking = await Meteor.call('booking.makePayment', charge);
                
                await Meteor.call('ticket.createTicketByBookingId', booking);
                
                // transaction type                  
                if (charge.card !== null) {     // Credit/Debit card
                    var { livemode } = charge.card;
                } else {                        // non-Credit/Debit card
                    var { livemode } = charge.source;
                }

                if (livemode) {     // Production
                    const bookingNo = booking.bookingNo;
                    const phoneNo = booking.contactInfo[0].phoneNo;
                    const msg = `Your BookingNo: ${bookingNo} From NJ Phuyaipu Check here: https://nj-phuyaipu.meteorapp.com/mybookings`
                
                    sendSMS(phoneNo, msg);     
                }
            } 
        }
    } catch (err) {
        console.error(err);
    }

    next();
};

module.exports = {
    checkoutCreditCard,
    checkoutInternetBanking,
    checkoutPromptPay,
    omiseWebHooks
};