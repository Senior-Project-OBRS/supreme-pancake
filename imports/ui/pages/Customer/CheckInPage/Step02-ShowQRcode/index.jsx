import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { QRCodeSVG } from 'qrcode.react';
import './qrcode.css';
import Spinner from '../../../../components/Spinner';

export default ShowQRcode = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    if (useLocation().state === null) goBack();

    const { bookingId } = useParams();
    const { tickets } = useLocation().state;

    const [tickets_id, setTickets_id] = useState([]);

    useEffect(() => {
        let isSubscribed = true;

        const result = tickets.reduce((arr, ticket) => {
            arr.push(ticket._id);

            return arr;
        }, []);

        if (isSubscribed) setTickets_id(result);

        // cleanup function
        return () => {
            isSubscribed = false;
        };
    }, [tickets]);

    return (
        <React.Fragment>
            {!tickets.length ? (
                <Spinner />
            ) : (
                <Popup
                    // trigger={<div className= 'qrpush'><button className='button'>Show QR Code</button></div>}
                    trigger={<div className='qrpush'><button className='button'>แสดง QR Code</button></div>}
                    modal
                >
                    <QRCodeSVG id='checkin' className='qrsvg' value={tickets_id.toString()} />
                    <br />
                    <div>
                        <p>จำนวนผู้โดยสาร {tickets.length} คน</p>

                        <ol>
                            {tickets.map(ticket => {
                                return (
                                    <li key={ticket._id}>
                                        {ticket.titleName}{ticket.firstName} {ticket.lastName}
                                    </li>
                                )
                            })}
                        </ol>
                    </div>
                </Popup>
            )}
        </React.Fragment>
    );
};