import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import './cancel.css';
import BANK_options from '../../../../utils/enums/options/BANK_options';

const initial_bankAccountState = {
    type: '',
    accountNo: '',
    accountName: ''
};

const transaction_options = {
    PromptPay: 'promptpay',
    Bank: 'bank'
};

export default CancelPage = () => {
    const [selected_transaction, setSelected_transaction] = useState('');
    const [recipientAccount, setRecipientAccount] = useState(initial_bankAccountState);

    const { bookingId } = useParams();
    const navigate = useNavigate();

    const handle_selectTransaction = e => {
        const value = e.target.value;
        setSelected_transaction(value);

        if (value === transaction_options.PromptPay) {
            handle_selectBank({
                value, 
                text: 'พร้อมเพย์' 
            });
        } else {
            handle_selectBank('');
        }
    };
    
    const handle_selectBank = e => {
        let data = initial_bankAccountState;
        data.type = e;

        setRecipientAccount(data);
    };

    const handle_fillInBankAccount = e => {
        let dataCopy = {...recipientAccount};
        dataCopy[e.target.id] = e.target.value;

        setRecipientAccount(dataCopy);
    };

    const handle_cancelBookingSubmit = e => {
        e.preventDefault();

        Meteor.call('booking.cancel', bookingId, (error, result) => {
            if (error) {
                console.error(error);
                alert('something');
            } else if (result) {
                const { bookingNo, amount } = result;

                Meteor.call('refund.createByBookingid', bookingId, recipientAccount, amount, (err, res) => {
                    if (err) {
                        console.error(err);
                        alert('something');
                    } else if (res) {
                        alert(`ยกเลิก Booking ${bookingNo} สำเร็จ`);   
                        navigate('/mybookings'); 
                    }
                });
            }
        });
    };

    return (
        <React.Fragment>
            <form onSubmit={handle_cancelBookingSubmit}>
                <div className = 'cancel'>
                    <div className = 'card'>
                <h2>กรุณาระบุข้อมูลบัญชีผู้รับเงิน เพื่อขอรับเงินคืน</h2>
                <p>เลือกประเภทบัญชีผู้รับเงิน</p>

                {Object.entries(transaction_options).map(([k, v]) => {
                    return (
                        <div className='cancel'>
                            <input 
                                className='ratiocancel'
                                type="radio"
                                id={v}
                                value={v}
                                onChange={handle_selectTransaction}
                                checked={selected_transaction === v}
                            />
                            <label htmlFor={v}>
                                {k}
                            </label>
                        </div>
                    )
                })}

                {!selected_transaction ? null : (
                    <React.Fragment>
                        {selected_transaction === transaction_options.Bank &&
                            <React.Fragment>
                                <div></div>
                                <Select 
                                    className='bankselect'
                                    placeholder='--เลือกธนาคาร--'
                                    options={BANK_options}
                                    onChange={e => handle_selectBank(e)}
                                    getOptionLabel={e => (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                          {e.icon}
                                          <span style={{ marginLeft: 5 }}>{e.text}</span>
                                        </div>
                                      )}
                    
                                />

                                <label htmlFor='accountNo'>หมายเลขบัญชี</label>
                                <input 
                                    id='accountNo'
                                    type='number'
                                    // maxLength="10"
                                    placeholder='ex. xxx-x-xxxxx-x'
                                    value={recipientAccount.accountNo}
                                    onChange={e => handle_fillInBankAccount(e)}   
                                    // disabled={!recipientAccount.type}
                                    required          
                                />
                            </React.Fragment>
                        }

                        {selected_transaction === transaction_options.PromptPay &&
                            <React.Fragment>
                                <label htmlFor='accountNo'>รหัสพร้อมเพย์</label>
                                <input 
                                    id='accountNo'
                                    type='number'
                                    placeholder='ระบุเบอร์มือถือ/เลขบัตรประชาชน/เลขประจำตัวผู้เสียภาษี'
                                    value={recipientAccount.accountNo}
                                    onChange={e => handle_fillInBankAccount(e)}  
                                    required           
                                />
                            </React.Fragment>
                        }

                        <label htmlFor='accountName'>ชื่อบัญชี</label>
                        <input 
                            id='accountName'
                            type='text'
                            placeholder='ex. สมชาย ใจสะอาด'
                            value={recipientAccount.accountName}
                            onChange={e => handle_fillInBankAccount(e)}  
                            disabled={!recipientAccount.accountNo}
                            required           
                        />

                        <button>
                            ส่งเรื่อง
                        </button>
                    </React.Fragment>
                )}
                   
                    </div>
              </div>
            </form>
        </React.Fragment>
    );
};