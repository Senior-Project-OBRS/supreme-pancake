import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Spinner from '../../../../components/Spinner';
import Ticket from './Ticket';

import './ticketcheck.css'

export default SelectTicket = () => {
    const [tickets, setTickets] = useState([]);

    const { bookingId } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        let isSubscribed = true;

        Meteor.call('ticket.findAllTicketsByBookingId', bookingId, (error, result) => {
            if (error) {
                console.error(error);
                alert('ไม่สามารถเรียกดูตั๋วโดยสารได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
            } else if (isSubscribed && result) {
                result.forEach(item => {
                    item.isChecked = false;
                });

                setTickets(result);
            }
        });

        // cleanup function
        return () => {
            isSubscribed = false;
        }
    }, [bookingId]);

    const toggleChecked = ({ _id: ticketId, isChecked }) => {
        tickets.find((obj, i) => {
            if (obj._id === ticketId) {
                tickets[i].isChecked = !isChecked;
            }
        });
    };

    const handle_continue = () => {
        let result = [];

        tickets.forEach(ticket => {
            if (ticket.isChecked) result.push(ticket);
        });

        navigate(`/check-in/${bookingId}/confirm`, {
            state: {
                tickets: result
            }
        });
    };

    return (
        <React.Fragment>
            {!tickets.length ? (
                <Spinner />
            ) : (
                <React.Fragment>
                    <div className='headcuscheck'>
                    <h2>เลือกผู้โดยสารที่ต้องการเช็คอิน</h2>
                    </div>
                    <div className ='ticketch'>

                    <div className ='card'>
                        <p>
                            {tickets[0].booking.pickUp_point} - {tickets[0].booking.dropOff_point}
                        </p>
                        <p>
                            {tickets[0].booking.bus_schedule.deptDate} | {tickets[0].booking.bus_schedule.deptTime}
                        </p>
                        </div>
                    </div>
                    <br/>
                    <div className='ticketpass'> 
                    <div className='card'>
                        {tickets.map(ticket => (
                            <Ticket 
                                key={ticket._id}
                                ticket={ticket}
                                onCheckboxClick={toggleChecked}
                            />
                        ))}
                    </div>
                    </div>
                    <div className = 'ticketch'>
                    <button className ='button' onClick={() => handle_continue()}>
                        ดำเนินการต่อ
                    </button>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};