import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';

if (Meteor.isServer) {
    Meteor.methods({
        'SendVerificationLink'() {
            let userId = Meteor.userId();
            if (userId) {
                console.log("Email has been sent");
                Accounts.sendVerificationEmail(userId);
            }
        }
    });
}