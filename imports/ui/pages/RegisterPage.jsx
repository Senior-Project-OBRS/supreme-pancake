import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Select from 'react-select';

import './register.css'
import ROLES from '../../utils/enums/USER_role';

const usernameValidator = /^[A-z][A-z0-9-_]{3,23}$/;
const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const nameValidator = /^[ก-๏\s]+$/;

export default RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [gender, setGender] = useState('');

    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        if (usernameError) {
            // alert("Username is not valid");  
            alert("ชื่อบัญชีผู้ใช้ไม่ถูกต้อง"); 
        } else if (emailError) {
            // alert("Email is not valid");
            alert("อีเมลไม่ถูกต้อง");
        } else if (passwordError) {
            // alert("Password must contain at lest 8 characters, 1 number, 1 upper and 1 lowercase!");
            alert("รหัสผ่านต้องมีอย่างน้อย 8 ตัว ที่ประกอบด้วยตัวเลขอย่างน้อย 1 ตัว ตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว และตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว")
        } else if (confirmPasswordError) {
            // alert("Confirm Password should be match with password");
            alert("ยืนยันรหัสผ่านไม่ตรงกัน");
        } else if (firstNameError) {
            // alert('First Name is not valid');
            alert('กรุณาระบุชื่อจริงเป็นภาษาไทย');
        } else if (lastNameError) {
            // alert('Last Name is not valid');
            alert('กรุณาระบุนามสกุลเป็นภาษาไทย');
        } else if (!gender) {
            alert('กรุณาระบุเพศ');
        } else {
            Accounts.createUser({
                email: email,
                username: username,
                password: password,
                createdAt: new Date(),
                profile: {
                    firstName: firstName,
                    lastName: lastName,
                    roles: ROLES.Admin
                }
            }, (error, result) => {
                if (error) {
                    console.error(error);
                    // alert('username is already exist');
                    alert('มีชื่อบัญชีผู้ใช้นี้แล้ว');
                } else if (result) {
                    navigate('/');

                    // Meteor.call('SendVerificationLink', (err, res) => {
                    //     if (err) {
                    //         alert(err);
                    //         return;
                    //     }
    
                    //     navigate('/authenticated');
                    // });
                }
            })
        }
        
    };

    const validateUsername = (e) => {
        const value = e.target.value;
        setUsername(value);

        if (!usernameValidator.test(value)) {
            setUsernameError("ชื่อบัญชีผู้ใช้ไม่ถูกต้อง");       
        } else {
            setUsernameError('');
        }
    };

    const validateEmail = (e) => {
        const value = e.target.value
        setEmail(value)

        if (!emailValidator.test(value)) {
            setEmailError("อีเมลไม่ถูกต้อง");
        } else {
            setEmailError("");
        }
    };

    const validatePassword = (e) => {
        const pwd = e.target.value
        setPassword(pwd)

        if (!passwordValidator.test(pwd)) {
            setPasswordError("รหัสผ่านต้องมีอย่างน้อย 8 ตัว ที่ประกอบด้วยตัวเลขอย่างน้อย 1 ตัว ตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว และตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว");
        } else {
            setPasswordError("");
        }
    };

    const validateConfirmPassword = (e) => {
        const confPwd = e.target.value
        setConfirmPassword(confPwd)

        if (password != confPwd) {
            setConfirmPasswordError("ยืนยันรหัสผ่านไม่ตรงกัน");
        } else {
            setConfirmPasswordError("");
        }
    };

    const validateFirstName = e => {
        const fName = e.target.value;
        setFirstName(fName);

        if (!nameValidator.test(fName)) {
            setFirstNameError("กรุณาใส่ชื่อจริงภาษาไทย");
        } else {
            setFirstNameError('');
        }
    };

    const validateLastName = e => {
        const lName = e.target.value;
        setLastName(lName);

        if (!nameValidator.test(lName)) {
            setLastNameError("กรุณาใส่นามสกุลภาษาไทย");
        } else {
            setLastNameError('');
        }
    };

    const genderOptions = [
        { value: 'ชาย', label: 'ชาย' },
        { value: 'หญิง', label: 'หญิง' },
    ];

    const handleOnChange_gender = e => {
        if (e) setGender(e.value);
    };
       
    return (
        <React.Fragment>
            <div className ="register">
                <div className ='headregister'>
                    <h1>สมัครสมาชิก</h1>
                </div>

                <div className ='card'>
                    <div 
                        className="form-group"
                        data-validate="Valid email is required: ex@abc.xyz"
                    >
                        <label htmlFor="email">อีเมล</label>
                        <input
                            id = "email"
                            type="email"
                            placeholder="ex. abc@gmail.com"
                            name="email"
                            required
                            onChange={(e) => validateEmail(e)}
                        /><br/>
                        <div className = 'fonterror'>
                        {emailError}
                        </div>
                    </div>
                   

                    <div className="form-group">
                        <label htmlFor="username">ชื่อผู้ใช้</label>
                        <input
                            id='username'
                            type="text"
                            placeholder="ex. abcd"
                            name="username"
                            required
                            onChange={(e) => validateUsername(e)}
                        />
                        <div className = 'fonterror'>
                        {usernameError}
                        </div>
                        
                    </div>
                   

                    <div 
                        className="form-group"
                        data-validate="Password is required"
                    >
                        <label htmlFor="password">รหัสผ่าน</label>
                        <input
                            id = 'password'
                            type="password"
                            name="password"
                            value={password}
                            required
                            onChange={(e) => validatePassword(e)}
                        />
                         <div className = 'fonterror'>
                         </div>
                    </div>
                   

                    <div   
                        className="form-group"
                        data-validate="Confirm Password is required"
                    >
                        {/* <label htmlFor="confirmPassword">Confirm password</label> */}
                        <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</label>
                        <input 
                            id ='cfpassword'
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            required 
                            onChange={(e) => validateConfirmPassword(e)}  
                        />
                        <div className = 'fonterror'>
                        {confirmPasswordError}
                        </div>
                    </div>
                    

                    <div className="form-group">
                        <label htmlFor="firstname">ชื่อจริง</label>
                        <input
                            id ='firstname'
                            name="firstName"
                            type="text"
                            placeholder="ex. สมชาย"
                            pattern = '^[ก-๏\s]+$'
                            value={firstName}
                            required
                            onChange={e => validateFirstName(e)}
                        />
                        <div className = 'fonterror'>
                        {firstNameError}
                        </div>
                    </div>
                

                    <div className="form-group">
                        <label htmlFor="lastname">นามสกุล</label>
                        <input
                            id='lastname'
                            name="lastName"
                            type="text"
                            pattern = '^[ก-๏\s]+$'
                            placeholder="ex. ใจสะอาด"
                            value={lastName}
                            required
                            onChange={e => validateLastName(e)}
                        />
                        <div className = 'fonterror'>
                        {lastNameError}
                        </div>
                    </div>
                  

                    <label htmlFor='gender'>เพศ</label>
                    <Select 
                        className = 'selectgender'
                        id='gender'
                        value={ {label: gender ? gender : '--เลือกเพศ--'} }
                        options={genderOptions}
                        onChange={handleOnChange_gender}
                        isSearchable={false}                           
                    />
                    <div>
                        <button id = 'registerbutton' className = 'button' type="submit" onClick={e => handleSubmit(e)}>
                            {/* Register */}
                            สมัคร
                        </button>
                    </div>
                      
                <p>
                    เมื่อคลิก สมัคร แสดงว่าคุณยินยอมตาม

                    <Link to="/terms-and-conditions" target="_blank">
                        ข้อกำหนด
                    </Link>

                    &nbsp; และ

                    <Link to="/privacy-policy" target="_blank">
                        นโยบายข้อมูล
                    </Link>

                    ของเราแล้ว
                </p>
                </div>
          
            </div>
        </React.Fragment>
    );
};