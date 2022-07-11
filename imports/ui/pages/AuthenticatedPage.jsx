import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router-dom';

export default AuthenticatedPage = () => {
    const handleLinkClick = e => {
        e.preventDefault();

        Meteor.call('SendVerificationLink', (error, response) => {
            if (error) {
                alert(error);
                return;
            }
    
            let email = Meteor.user().emails[0].address;
            console.log(`Verification sent to ${email}!`, 'success');
        });
    };

    return (
        <React.Fragment>
            {Meteor.user().emails[0].verified 
                ? <div>Failed !</div>
                : <div>
                    You need to verify your email address before using GoDunk.
                    <Link to='#' onClick={e => handleLinkClick(e)}>
                        Resend verification link.
                    </Link>
                </div>
            }
        </React.Fragment>
    );
};