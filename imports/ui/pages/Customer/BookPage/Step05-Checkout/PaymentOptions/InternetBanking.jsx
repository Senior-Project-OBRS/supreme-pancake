import React from 'react';

import axios from '../../../../../../api/axios';
import CHECKOUT_url from '../../../../../../utils/enums/url/CHECKOUT_url';

export default CheckoutBy_internetBanking = ({ bookingId, contactInfo, total_fare }) => {
    const createInternetBankingCharge = async (bookingId, email, name, phoneNo, amount, token) => {
        return await axios
            .post(CHECKOUT_url.internetBanking,
                JSON.stringify({ bookingId, email, name, phoneNo, amount, token }),
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
                    window.location.href = authorizeUri
                }
            })
            .catch(err => {
                console.error(err);
                alert('เกิดปัญหาในการชำระเงินผ่านอินเทอร์เน็ตแบงก์กิ้ง กรุณาลองใหม่อีกครั้ง');
            })
    };
    
    const internetBankingConfigure = () => {
        OmiseCard.configure({
            defaultPaymentMethod: "internet_banking",
            otherPaymentMethods: []
        });
        OmiseCard.configureButton('#internet-banking');
        OmiseCard.attach();
    };

    const omiseCardHandler = () => {
        OmiseCard.open({
            // frameDescription: 'Bus and Other Transportation Services',
            frameDescription: 'N.J. TRAVEL & TRANSPORT LIMITED PARTNERSHIP',
            amount: total_fare * 100,       // convert baht to stang
            onCreateTokenSuccess: (token) => {
                createInternetBankingCharge(bookingId, contactInfo.email, contactInfo.firstName, contactInfo.phoneNo, total_fare * 100, token)
            },
            onFormClosed: () => {},
        })
    };

    const handleClick = e => {
        e.preventDefault();

        internetBankingConfigure();
        omiseCardHandler();
    };

    return (
        <div className='own-form'>
            <form className='vertical-centeri'>
                <button
                    id='internet-banking'
                    className = 'button'
                    type='button'
                    disabled={total_fare === 0}
                    onClick={e => handleClick(e)}
                >
                    {/* Pay with Internet Banking */}
                    ชำระผ่านอินเทอร์เน็ตแบงก์กิ้ง
                </button>            
            </form>
        </div>
    );
};