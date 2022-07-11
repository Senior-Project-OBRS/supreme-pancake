import { Meteor } from 'meteor/meteor';
import React from 'react';

import './login.css';

export default LoginWithGoogle = ({ redirect }) => {
    const handleGoogleLogin = e => {
        e.preventDefault();
        
        Meteor.loginWithGoogle({
            requestPermissions: ['profile', 'email']
        }, (error) => {
            if (error) {
                console.error(error);
                alert('ไม่สามารถเข้าสู่ระบบด้วย Google ได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
            } else {
                redirect();
            }
        });
    };

    return (
        <React.Fragment>
            <button type="button" className="" onClick={handleGoogleLogin}>
                เข้าสู่ระบบด้วย Google
                <div>
                    
                </div>
            </button>
        </React.Fragment>
    );
};