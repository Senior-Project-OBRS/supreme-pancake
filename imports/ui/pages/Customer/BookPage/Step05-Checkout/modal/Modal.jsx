import React from 'react';
import './Modal.css';

export default Modal = ({ charge, closeModal }) => {
    return (
        <React.Fragment>
            <div className='modal__box'>
                <header>
                    {/* <h3>Thank you for your payment with {charge.paidBy}</h3> */}
                    <h3>ขอบคุณที่ชำระเงินผ่าน {charge.paidBy}</h3>
                </header>
                <section className='modal__content'>
                    <h4>
                        {/* Your payment amount is{" "} */}
                        จำนวน {" "}
                        <span className='amount'>
                            {new Intl.NumberFormat().format(charge.amount)} บาท
                        </span>
                        {/* , status:{" "} */}
                        , สถานะ :{" "}
                        <span 
                            className={
                                charge.status === "successful"
                                    ? "success"
                                    : charge.status === "failed"
                                    ? "failed"
                                    : "pending"
                            }
                        >
                            {charge.status}
                        </span>
                        {charge.status === 'failed' && 'Please try again.'}
                    </h4>
                </section>
                <section className='modal__action'>
                    <div class='modals'>
                    <button className='buttons' onClick={closeModal}>
                        {/* Close */}
                        &times;
                    </button>
                    </div>
                </section>
            </div>
        </React.Fragment>
    );
};