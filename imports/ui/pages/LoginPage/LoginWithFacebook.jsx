import { Meteor } from 'meteor/meteor';
import React from 'react';

import './login.css';

export default LoginWithFacebook = ({ redirect }) => {
    const handleFacebookLogin = e => {
        e.preventDefault();
        
        Meteor.loginWithFacebook({
            requestPermissions: ['public_profile', 'email']
        }, (error) => {
            if (error) {
                console.error(error);
                alert('ไม่สามารถเข้าสู่ระบบด้วย Facebook ได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
            } else {
                redirect();
            }
        });
    };

    return (
        <React.Fragment>
            <button type="button" className="" onClick={handleFacebookLogin}>
                เข้าสู่ระบบด้วย Facebook
                <div>

                </div>
            </button>
        </React.Fragment>
    );
};