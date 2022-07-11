import React from 'react';

import axios from '../../../../../../api/axios';
import CHECKOUT_url from '../../../../../../utils/enums/url/CHECKOUT_url';

export default CheckoutBy_creditCard = ({ bookingId, contactInfo, total_fare }) => {
    const createCreditCardCharge = async (bookingId, name, phoneNo, amount, token) => {
        return await axios
            .post(CHECKOUT_url.creditCard, 
                JSON.stringify({ bookingId, name, phoneNo, amount, token }), 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(res => {
                const { authorizeUri } = res.data;
                if (authorizeUri) {
                    // handleStop_timer(bookingId);
                    window.location.href = authorizeUri;
                }
            })
            .catch(err => {
                console.error(err);
                alert('เกิดปัญหาในการชำระเงินผ่านบัตรเครดิต/เดบิต กรุณาลองใหม่อีกครั้ง');
            })
    };
    
    const creditCardConfigure = () => {
        OmiseCard.configure({
            defaultPaymentMethod: 'credit_card',
            otherPaymentMethods: []
        });
        OmiseCard.configureButton('#credit-card');
        OmiseCard.attach();
    };

    const omiseCardHandler = () => {
        OmiseCard.open({
            // frameDescription: 'Bus and Other Transportation Services',
            frameDescription: 'N.J. TRAVEL & TRANSPORT LIMITED PARTNERSHIP',
            amount: total_fare * 100,       // convert baht to stang
            onCreateTokenSuccess: (token) => {
                createCreditCardCharge(bookingId, contactInfo.firstName, contactInfo.phoneNo, total_fare * 100, token)
            },
            onFormClosed: () => {},
        })
    };

    const handleClick = e => {
        e.preventDefault();

        creditCardConfigure();
        omiseCardHandler();
    };

    return (
        <div className='own-form'>
            <form className='vertical-centerc'>
                <button 
                    id="credit-card"
                    className='button' 
                    type='button' 
                    disabled={total_fare === 0}
                    onClick={e => handleClick(e)}
                >
                    {/* Pay with Credit Card */}
                    ชำระผ่านบัตรเครดิต/เดบิต
                </button>
            </form>
        </div>
    );
};