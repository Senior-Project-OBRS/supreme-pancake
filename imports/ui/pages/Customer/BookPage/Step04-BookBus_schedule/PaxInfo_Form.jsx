import React from 'react';
import Select from 'react-select';

import BOOKING_status from '../../../../../utils/enums/status/BOOKING_status';
import TITLENAME_options from '../../../../../utils/enums/options/TITLENAME_options';

import './step4.css';

// source: https://www.freecodecamp.org/news/build-dynamic-forms-in-react/

export default PaxInfo_Form = ({ NoPassengers, contactInfo, passengersInfo_Fields, setPassengers_Fields }) => {
    const addFields = e => {
        e.preventDefault();

        const newFields = {
            titleName: '',
            firstName: '',
            middleName: '',
            lastName: '',
            birthDate: '',
            status: BOOKING_status.pre_payment
        };

        setPassengers_Fields([...passengersInfo_Fields, newFields]);
    };

    const handleFormChange = (index, e) => {
        if (e) {
            let data = [...passengersInfo_Fields];
            data[index][e.target.id] = e.target.value;
            setPassengers_Fields(data);
        }
    };

    const handleSelect = (index, e) => {  
        if (e) {
            const data = [...passengersInfo_Fields];
            data[index]['titleName'] = e.value;
            setPassengers_Fields(data);
        }
    };

    const onCheckboxClick = ({ isChecked }) => {
        const firstPax = passengersInfo_Fields[0];
        const contact = contactInfo[0];

        if (isChecked === false) {
            firstPax.titleName = contact.titleName;
            firstPax.firstName = contact.firstName;
            firstPax.lastName = contact.lastName;
        }

        firstPax.isChecked = !isChecked;

        let dataCopy = [...passengersInfo_Fields];
        dataCopy[0] = firstPax;
    
        setPassengers_Fields(dataCopy);
    };

    const styles = {
        option: (provided, state) => ({
          ...provided,
          display: 'inline-block',
          flex: 1,
          minHeight: '1px',
          textAlign: 'left',
          width: "max-content",
          minWidth: "100%"
        })
    };


    return (
        <React.Fragment>   
           <form className ='container'>
                <br/>

                {passengersInfo_Fields.map((input, index) => {
                    return (
                        <div key={index}>
                            <div className = 'head'>
                                <br/>              
                            </div>
                            
                            <div className ='step4'>
                                <div className ='ofCard'> 
                                    <div className ='passhead'>
                                        <p>
                                            ผู้เดินทางคนที่ {index + 1}

                                        </p>
                                        
                                        {index + 1 === 1 &&
                                                <React.Fragment>
                                                    <input 
                                                        type="checkbox"
                                                        onClick={() => onCheckboxClick(passengersInfo_Fields[index])}
                                                        readOnly
                                                    />
                                                    &nbsp;&nbsp;
                                                    <span>
                                                        ข้อมูลเดียวกันกับผู้ติดต่อ
                                                    </span>
                                                </React.Fragment>
                                            }
                                    </div>

                                    <label>คำนำหน้า</label>
                                    <Select
                                        id = 'ptitleName'
                                        value={ {label: input.titleName ? input.titleName : '--เลือกคำนำหน้า--'} }
                                        options={TITLENAME_options}
                                        onChange={e => handleSelect(index, e)}
                                        isSearchable={false}
                                        required
                                        styles={styles}
                                        
                                    />
    
                                    <label htmlFor='firstName'>ชื่อ</label>
                                    &emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input
                                        id='firstName'
                                        pattern ='^[ก-๏\s]+$'
                                        className ='firstname'
                                        placeholder='ex. สมชาย'
                                        value={input.firstName}
                                        onChange={e => handleFormChange(index, e)}
                                        required
                                    
                                    />
                                    <span></span>

                                    {/* <label htmlFor='middleName'>ชื่อกลาง</label>
                                    <input 
                                        id='middleName'
                                        value={input.middleName}
                                        onChange={e => handleFormChange(index, e)}
                                    /> */}
                                    <br/>

                                    <label htmlFor='lastName'>นามสกุล</label>
                                    &nbsp;&nbsp;
                                    <input
                                        id='lastName'
                                        className = 'lastname'
                                        placeholder='ex. ใจสะอาด'
                                        pattern ='^[ก-๏\s]+$'
                                        value={input.lastName}
                                        onChange={e => handleFormChange(index, e)}
                                        required
                                        />
                                    <span ></span>

                                    <br/>
                                    <label htmlFor='birthDate'>วันเกิด</label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input 
                                        id='birthDate'
                                        type="date"
                                        value={input.birthDate}
                                        onChange={e => handleFormChange(index, e)}
                                        required
                                        min = "1922-01-01" max ="2022-01-01"
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </form>
            <br/>&nbsp;
           <div className ='addpass'>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button id = 'addpass' className = 'button'
                onClick={e => addFields(e)}
                disabled={passengersInfo_Fields.length >= NoPassengers}
               
            >
                กรอกข้อมูลผู้เดินทางคนต่อไป
            </button>
            </div>
            <br/>      
        </React.Fragment>
    );
};