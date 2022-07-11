// source: https://github.com/fecamp-cu/fe-2021-frontend/blob/21c7f718825b9b091422ca86992c71f88b1b7acf/src/pages/Payment/Qrcode.tsx

import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from "react-router-dom"

import axios from '../../../../../api/axios';
import CHECKOUT_url from '../../../../../utils/enums/url/CHECKOUT_url';

export default PromptPayQR_codePage = () => {
    const navigate = useNavigate()
    const paymentState = useLocation().state;

    useEffect(() => {
        if (!paymentState?.download_uri) {
            alert('ไม่สามารถดำเนินชำระเงินผ่านพร้อมเพย์ได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
            navigate(-1);
        }
    }, [paymentState?.download_uri]);

    return (
        <React.Fragment>
            <img className='qrpayment' src={paymentState?.download_uri} />
            
            <p className = 'qrresult'>
                เมื่อชำระเงินเรียบร้อยแล้ว สามารถพิมพ์ตั๋ว E-ticket ได้ที่ &nbsp;

                <Link to={`/mybooking/${paymentState?.bookingId}`}>
                    My Bookings
                </Link>
            </p>
        </React.Fragment>
    );
};