import { Meteor } from 'meteor/meteor';
import React, { useEffect } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';

import useScript from '../../../../../hooks/useScript';
import useTimer from '../../../../../hooks/useTimer';
import { isObjectEmpty } from '../../../../../utils/objectUtils';

import Spinner from '../../../../components/Spinner';
// import CountdownTimer from '../../../../components/CountdownTimer';
import CountdownTimer from '../../../../../utils/CountdownTimer';

import CheckoutBy_creditCard from './PaymentOptions/CreditCard';
import CheckoutBy_internetBanking from './PaymentOptions/InternetBanking';
import CheckoutBy_promptPay from './PaymentOptions/PromptPay';

import "./Checkout.css";

let OmiseCard;

export default Checkout = () => {
    if (useLocation().state === null) return <Navigate to='/' />

    const [loaded] = useScript("https://cdn.omise.co/omise.js");
    // const { handleStop_timer } = useTimer();

    const { 
        bus_scheduleId,
        deptStation,
        arrStation,
        deptDate,
        deptTime,
        arrTime,  
        bookingId,
        bookingNo,
        bookingStatus,
        contactInfo,
        passengersInfo,
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

    const handleLoadScript = async () => {   
        OmiseCard = window.OmiseCard;
        await OmiseCard.configure({
            publicKey:      "OMISE_TESTING",    // Testing
            // publicKey:      "OMISE_PRODUCTION",         // Production
            currency:       'thb',
            frameLabel:     'NJ.phuyaipu',
            submitLabel:    'PAY NOW',
            buttonLabel:    'Pay with Omise',
        });
    };

    useEffect(() => {
        if (loaded) handleLoadScript();
    }, [loaded]);

    return (
        <React.Fragment>
            <div className ='headpage5'>
                <h2>ชำระเงิน</h2>
                {/* <CountdownTimer /> */}
            </div>
            
            <div className ='card_checkout'>
                <div className='cart__summary'>
                
                <div className='cart-details'>
                    
                    <div className = 'price'>
                    <div className ='column'>
                        
                        <div className = 'card'>
                            <h2>รายละเอียดราคา </h2>
                                <span> {new Intl.NumberFormat().format(total_fare)} บาท</span>
                        </div>
                        
            {!loaded || isObjectEmpty(contactInfo) ? ( 
                <Spinner />
            ) : (     
                <React.Fragment>
                    <CheckoutBy_creditCard 
                        bookingId={bookingId}
                        contactInfo={contactInfo}
                        total_fare={total_fare} 
                    />
                    <br/>
                    <CheckoutBy_internetBanking
                        bookingId={bookingId}
                        contactInfo={contactInfo}
                        total_fare={total_fare} 
                    />
                    <br/>
                    <CheckoutBy_promptPay 
                        bookingId={bookingId}
                        contactInfo={contactInfo}
                        total_fare={total_fare}
                    />
                    <br/>

                    <div className ='payinfo'>
                       <p>
                            เมื่อคลิกปุ่ม "ชำระเงิน" จะถือว่าคุณตกลงและยินยอม<br/>
               
                            <Link to="/terms-and-conditions" target="_blank">ข้อตกลงและเงื่อนไขในการใช้บริการ</Link>
                            ของ คิวรถตู้ NJ ผู้ใหญ่ปู
                        </p>
                    </div>
                </React.Fragment>
            )} 
        </div>
        </div>
             </div>
             </div>
             
            <div className='step5' >
                <div className='column'>
                <br/><br/><br/><br/>
                    <div className='card'>
                        <p>หมายเลขการจอง : {bookingNo}</p>
                        <p>สถานะการจอง : {bookingStatus}</p>      
                    </div>
 
                    <br />
                    <div className ='card'>
                            <h2>รายละเอียดการเดินทาง</h2>
                                <p>จุดขึ้นรถ : {deptStation}</p>
                                <p>จุดลงรถ : {arrStation}</p>
                                <p>วันที่เดินทาง : {deptDate}</p>
                                <p>เวลาออก : {deptTime}</p>
                                <p>เวลาถึงที่หมายโดยประมาณ : {arrTime}</p>
                             </div>
                             <br />
                        <div className ='card'>
                    <h3>ติดต่อ </h3>
                   <br/>

                 <h4>ชื่อ {contactInfo[0].titleName}{contactInfo[0].firstName} {contactInfo[0].lastName} <br/> <br/> อีเมล : {contactInfo[0].email} หมายเลขโทรศัพท์ : {contactInfo[0].phoneNo}</h4>        
                    
                 </div>
                 <br/>
                 <div className = 'card'>
                 <h2>รายละเอียดผู้เดินทาง</h2>
                        {passengersInfo.map((input,index) =>{
                            return (
                                <div key ={index}>
                                <p>{index+1}.&emsp;{passengersInfo[index].titleName}{passengersInfo[index].firstName}&emsp; {passengersInfo[index].lastName}</p>
                                
                                </div>
                            )
                        })
                    }
                 </div>
                        <br/>   
                    </div>
                </div>
            </div>
        </React.Fragment>  
    );
}