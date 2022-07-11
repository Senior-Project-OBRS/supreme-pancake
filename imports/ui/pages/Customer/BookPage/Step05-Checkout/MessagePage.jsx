import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import MessageDetails from './modal/MessageDetails';
import Spinner from '../../../../components/Spinner';
import { isObjectNotEmpty } from '../../../../../utils/objectUtils';

export default MessagePage = () => {
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [charge, setCharge] = useState({});

    const { bookingId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let isSubscribed = true;
        Meteor.call('booking.findBookingById', bookingId, (err, res) => {
            if (err) {
                console.error(err);
                alert('เกิดปัญหาในการค้นหา Booking กรุณาลองใหม่อีกครั้ง');
            } else if (isSubscribed && res) {
                const payment_options = res.charge.paidBy;
                if (payment_options.startsWith('internet_banking')) {
                    // alert('ชำระเงินไม่สำเร็จ โปรดชำระเงินอีกครั้ง');
                    alert('ชำระเงินเรียบร้อยแล้ว การชำระเงินของคุณจะได้รับการยืนยันในเวลา 15 นาที กรุณาตรวจสอบสถานะการจองตั๋วในหน้า My Bookings อีกครั้ง');
                    
                    navigate('/mybookings', {
                        state: {
                            bookingId
                        }
                    });
                    // const goBack = () => navigate(-2);
                    // goBack();
                } else {
                    setCharge(res.charge);
                    setLoading(false);
                    setOpenModal(true);
                
                }
            }
        });

        // cleanup function
        return () => {
            isSubscribed = false;
        }
    }, [bookingId]);

    const handleCloseModal = () => {
        setOpenModal(false);
        navigate(`/mybooking/${bookingId}`);
    };

    return (
        <React.Fragment>
            {loading && <Spinner />}
            {openModal && (
                <MessageDetails charge={charge} closeModal={handleCloseModal} />
            )}
        </React.Fragment>
    );   
};