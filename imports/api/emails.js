import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';

Accounts.emailTemplates.siteName = "name";
Accounts.emailTemplates.from     = "name <admin@name.com>";

Accounts.emailTemplates.verifyEmail = {
    subject() {
        return "[GoDunk] Verify Your Email Address";
    },
    text(user, url) {
        let emailAddress   = user.emails[0].address,
            urlWithoutHash = url.replace('#/', ''),
            supportEmail   = "support@name.com",
            emailBody      = `To verify your email address ${emailAddress} visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you fell something is wrong, please contact our support team: ${supportEmail}.`;
        
        return emailBody;
    }
};