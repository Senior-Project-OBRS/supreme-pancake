import React from 'react';
import Select from 'react-select';

import TITLENAME_options from '../../../../../utils/enums/options/TITLENAME_options';

import './step4.css';

export default ContactInfo_Form = ({ contactInfo_Fields, setContactInfo_Fields }) => {
    const handleFormChange = (e) => {
         if (e) {
            let data = [...contactInfo_Fields];
            data[0][e.target.id] = e.target.value;
            setContactInfo_Fields(data);
        }
    };

    const handleSelect = (e) => {  
        if (e) {
            const data = [...contactInfo_Fields];
            data[0]['titleName'] = e.value;
            setContactInfo_Fields(data);
        }
    };
    const   styles = {
        
        option: (base) => ({
        ...base,    
        width: "max-content",
        minWidth: "100%"
        })
    };

    return (
        <React.Fragment>
            <div className = 'head'>
                {/* <h2>ข้อมูลการติดต่อ</h2> */}
            </div>
           
            {contactInfo_Fields.map(input => {
                
                return (
                    <div className="step4" key={input}>
                        <div className='card'> 
                            <label>คำนำหน้า</label>       
                            <Select 
                                id='titleName'
                                value={ {label: input.titleName ? input.titleName : '--เลือกคำนำหน้า--'} }
                                options={TITLENAME_options}
                                onChange={e => handleSelect(e)}
                                isSearchable={false}
                                required
                                style={styles}
                            />
                            

                            <label htmlFor='firstName'>ชื่อ</label>
                            <input 
                                id ='firstName'
                                className ='firstname'
                                pattern ='^[ก-๏\s]+$'
                                placeholder='ex. สมชาย'
                                value={input.firstName}
                                onChange={e => handleFormChange(e)}
                                required
                            />
                            <span></span>
                            {/* <label htmlFor='middleName'>ชื่อกลาง</label>
                            <input 
                                id='middleName'
                                value={input.middleName}
                                onChange={e => handleFormChange(e)}
                            /> */}

                            <label htmlFor='lastName'>นามสกุล</label>
                            <input 
                                className ='lastname'
                                id='lastName'
                                type ="text"
                                pattern ='^[ก-๏\s]+$'
                                placeholder='ex. ใจสะอาด'
                                value={input.lastName}
                                required
                                onChange={e => handleFormChange(e)}
                                
                            />
                            <span></span>
                            <label htmlFor='phoneNo'>หมายเลขโทรศัพท์</label>
                            <input 
                                className='phone'
                                id='phoneNo'
                                placeholder='ex. 0811111111'
                                type = "tel"
                                pattern = "^[0]{1}[6,8,9]{1}[0-9]{8}"
                                value={input.phoneNo}
                                onChange={e => handleFormChange(e)}
                                required
                            />
                            <span></span>    
                            <label htmlFor='email'>อีเมล</label>
                            <input 
                                id='email'
                                className = 'email'
                                placeholder='ex. prayut@email.com'
                                type="email"
                                value={input.email}
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                onChange={e => handleFormChange(e)}
                                required
                            />
                            <span></span>
                        </div>
                    </div>
                )
            })}
        </React.Fragment>
    );
}; 