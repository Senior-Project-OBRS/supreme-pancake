import React from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../../../../../../api/axios';
import CHECKOUT_url from '../../../../../../utils/enums/url/CHECKOUT_url';

export default CheckoutBy_promptPay = ({ bookingId, contactInfo, total_fare }) => {
    const navigate = useNavigate();
    
    const createPromptPayCharge = async (bookingId, email, name, phoneNo, amount, token) => {
        return await axios
            .post(CHECKOUT_url.promptPay,
                JSON.stringify({ bookingId, email, name, phoneNo, amount, token }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(res => {
                const { download_uri } = res.data;
                if (download_uri) {
                    navigate('/bus_schedule/checkout/promptpay', {
                        state: {
                            bookingId,
                            download_uri
                        }
                    });
                }
            })  
            .catch(err => {
                console.error(err);
                alert('เกิดปัญหาในการชำระเงินผ่านพร้อมเพย์ กรุณาลองใหม่อีกครั้ง');
            })
    };
    
    const promptPayConfigure = () => {
        OmiseCard.configure({
            defaultPaymentMethod: "promptpay",
            otherPaymentMethods: []
        });
        OmiseCard.configureButton('#promptPay');
        OmiseCard.attach();
    };

    const omiseCardHandler = () => {
        OmiseCard.open({
            // frameDescription: 'Bus and Other Transportation Services',
            frameDescription: 'N.J. TRAVEL & TRANSPORT LIMITED PARTNERSHIP',
            amount: total_fare * 100,       // convert baht to stang
            onCreateTokenSuccess: (token) => {
                createPromptPayCharge(bookingId, contactInfo.email, contactInfo.firstName, contactInfo.phoneNo, total_fare * 100, token)
            },
            onFormClosed: () => {},
        })
    };

    const handleClick = e => {
        e.preventDefault();

        promptPayConfigure();
        omiseCardHandler();
    };

    return (
        <React.Fragment>
            <div className='own-form'>
                <form className='vertical-centerp'>
                    <button
                        id='promptPay'
                        className='button'
                        type='button'
                        disabled={total_fare === 0}
                        onClick={e => handleClick(e)}
                    >
                        {/* Pay with PromptPay */}
                        ชำระผ่านพร้อมเพย์
                    </button>            
                </form>
            </div>
        </React.Fragment>
    );
};