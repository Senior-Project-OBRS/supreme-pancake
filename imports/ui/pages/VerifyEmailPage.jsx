import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default VerifyEmailPage = () => {
    let { token } = useParams();
    const navigate = useNavigate();

    Accounts.onEmailVerificationLink((token, done) => {
        Accounts.verifyEmail(token, (error) => {
            if (error) {
                console.error(error);
                alert('เกิดปัญหาในการตรวจสอบอีเมล กรุณาลองใหม่อีกครั้ง');
            } else {
                console.log('Email verified! Thanks!', 'success');
                navigate('/');
            }
        });
    });
    // Accounts.verifyEmail(token, (error) => {
    //     if (error) console.error(error);

    //     navigate('/');
    //     console.log('Email verified! Thanks!', 'success');
    // });
};