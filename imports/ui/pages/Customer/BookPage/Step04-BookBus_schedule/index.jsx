import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

import ContactInfo_Form from './ContactInfo_Form';
import PaxInfo_Form from './PaxInfo_Form';

import useTimer from '../../../../../hooks/useTimer';
import BOOKING_status from '../../../../../utils/enums/status/BOOKING_status';
import { isObjectNotEmpty } from '../../../../../utils/objectUtils';

import './step4.css';

export default BookBus_schedule = () => {
    if (useLocation().state === null) return <Navigate to='/' /> 

    const navigate = useNavigate();
    const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneValidator = /^[0]{1}[6,8,9]{1}[0-9]{8}/;
    const Name = /^[ก-๏\s]+$/;

    const { setTime, handleStart_timer } = useTimer();
    const { 
        bus_scheduleId,
        deptStation,
        arrStation,
        deptDate,
        deptTime,
        arrTime,
        travelTime,
        NoPassengers,
        total_fare 
    } = useLocation().state;

    const { occupied_seat, total_seating } = () => {
        Meteor.call('bus_schedule.getBusSeatingCapacity', bus_scheduleId, (error, result) => {
            if (error) {
                console.error(error);
                alert('เกิดปัญหาในการเรียกความจุที่นั่งรถโดยสาร กรุณาลองใหม่อีกครั้ง');
            } else if (result) {
                return {
                    occupied_seat: result.occupied_seat,
                    total_seating: result.total_seating
                };
            }
        });
    };

    const noSeatingAvailable = occupied_seat >= total_seating ? true : false

    if (noSeatingAvailable) {
        alert('รอบนี้เต็มแล้ว กรุณาเลือกรอบอื่น');
        return <Navigate to='/' /> 
    }

    /* ContactInfo_Form */
    const [contactInfo, setContactInfo] = useState([
        { 
            titleName: '',
            firstName: '',
            middleName: '',
            lastName: '',
            phoneNo: '',
            email: ''
        }
    ]);

    /* PaxInfo_Form */
    const [passengersInfo, setPassengersInfo] = useState([
        { 
            titleName: '',
            firstName: '',
            middleName: '',
            lastName: '',
            birthDate: '',
            isChecked: false,
            status: BOOKING_status.pre_payment
        }
    ]);
    $.fn.commentCards = function(){

        return this.each(function(){
      
          var $this = $(this),
              $cards = $this.find('.card'),
              $current = $cards.filter('.card--current'),
              $next;
      
          $cards.on('click',function(){
            if ( !$current.is(this) ) {
              $cards.removeClass('card--current card--out card--next');
              $current.addClass('card--out');
              $current = $(this).addClass('card--current');
              $next = $current.next();
              $next = $next.length ? $next : $cards.first();
              $next.addClass('card--next');
            }
          });
      
          if ( !$current.length ) {
            $current = $cards.last();
            $cards.first().trigger('click');
          }
      
          $this.addClass('cards--active');
      
        })
      
    };
      
    $('.cards').commentCards();

    const handleSubmit = e => {
        e.preventDefault();
        index = [0,1,2,3]
        var complete = true
        passengersInfo.forEach(obj => {
            if (!obj.titleName) complete = false;
        });
        
        if (passengersInfo.length != NoPassengers) {
            alert('กรอกข้อมูลผู้เดินทางไม่ครบ !');
            return;
        } else if (!contactInfo[0].titleName) {
            alert('โปรดระบุคำนำหน้าในข้อมูลผู้ติดต่อ');
            return;
        } else if (!emailValidator.test(contactInfo[0].email)) {
            alert('กรุณาใส่อีเมลให้ถูกต้อง');
            return;
        } else if (!phoneValidator.test(contactInfo[0].phoneNo)) {
            alert('กรุณาใส่หมายเลขโทรศัพท์ให้ถูกต้อง');
            return;
        } else if (!Name.test(contactInfo[0].firstName)) {
            alert('กรุณาใส่ชื่อจริงเป็นภาษาไทย');
            return;
        } else if (!Name.test(contactInfo[0].lastName)) {
            alert('กรุณาใส่นามสกุลเป็นภาษาไทย');
            return;            
        } else if (!Name.test(passengersInfo[0].firstName)) {
            alert('กรุณาใส่ชื่อจริงเป็นภาษาไทย');
            return;
        } else if (!Name.test(passengersInfo[0].lastName)) {
            alert('กรุณาใส่นามสกุลเป็นภาษาไทย');
            return;
        } else if (!complete) {
            alert('โปรดระบุคำนำหน้าในรายชื่อผู้เดินทาง');
            return;
        };

        delete passengersInfo[0].isChecked;

        Meteor.call('booking.createBooking', bus_scheduleId, deptStation, arrStation, contactInfo, passengersInfo, total_fare, (err, res) => {
            if (err) {
                console.error(err);
                alert('จองตั๋วรถไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
            } else if (isObjectNotEmpty(res)) {
                // countdown timer
                const bookingId = res.bookingId;
               
                navigate('/bus_schedule/checkout', {
                    state: {
                        bus_scheduleId,
                        deptStation,
                        arrStation,
                        deptDate,
                        deptTime,
                        arrTime,  
                        bookingId,
                        bookingNo: res.bookingNo,
                        bookingStatus: res.status,
                        contactInfo,
                        passengersInfo,
                        total_fare,
                    
                    }
                });
            }
        });
    }

    return (
        <React.Fragment>
            <div className ='headpage4'>
                <h2>กรอกข้อมูลผู้เดินทาง</h2>
            </div>
              
            <div className = 'column'>
                <ContactInfo_Form 
                    contactInfo_Fields={contactInfo}
                    setContactInfo_Fields={setContactInfo}   
                />
            </div>
         
            <div className='column'>
                <PaxInfo_Form 
                    NoPassengers={NoPassengers} 
                    contactInfo={contactInfo}
                    passengersInfo_Fields={passengersInfo} 
                    setPassengers_Fields={setPassengersInfo}
                /> 
            </div>
                  
            <div className='nextpay'>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button 
                    id='nextpay'
                    className='button' 
                    type='submit'
                    onClick={handleSubmit}
                >
                    ชำระเงิน
                </button>
            </div>
                
            <div className='column'>
                <div className='review'> 
                    <form className='card'>
                        <p>จุดขึ้นรถ : {deptStation}</p>
                        <p>จุดลงรถ : {arrStation}</p>
                        <p>วันเดินทาง : {deptDate}</p>
                        <p>เวลารถออก : {arrTime}</p>
                        <p>เวลาเดินทางโดยประมาณ :{travelTime} ชม.</p>
                        <p>จำนวนผู้เดินทาง : {NoPassengers}</p>
                        <p>จำนวนเงินรวม : {total_fare}</p>
                    </form><br/>
                </div>
            </div>    
        </React.Fragment>
    );
};  