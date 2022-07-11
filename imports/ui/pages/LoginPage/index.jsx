import { Meteor } from 'meteor/meteor';
import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import LoginWithGithub from './LoginWithGithub';
import LoginWithFacebook from './LoginWithFacebook';
import LoginWithGoogle from './LoginWithGoogle';

import ROLES from '../../../utils/enums/USER_role';

import "./login.css"

export default LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname;

    const usernameRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username]);

    const handleSubmit = e => {
        e.preventDefault();

        try {
            Meteor.loginWithPassword(username, pwd, (error, result) => {
                if (from) {
                    navigate(from, { replace: true });
                } else if (from) {
                    Meteor.call('FindUserByUsername', username, (error, result) => {
                        if (result) {
                            const role = result.profile.roles;

                            if (role === ROLES.Admin) {
                                navigate('/admin');
                            } else if (role === ROLES.Salesperson) {
                                navigate('/agent');
                            } else if (role === ROLES.Driver) {
                                navigate('/agent/driver');
                            }
                        }
                    });
                }
            }); 
        } catch (error) {
            console.error(error);
            alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            // alert('ไม่สามารถเรียกดูรายชื่อผู้ใช้งานได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
        }
    };

   
    // const redirectAfterLogin = () => {
    //     navigate(from, { replace: true })
    // };

    return (
        <React.Fragment>
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" :"offscreen"} aria-live="assertive">{errMsg}</p>

                <div className ='headlogin'>
                    <h1>เข้าสู่ระบบ</h1>
                </div>
                
                <form className='login' onSubmit={handleSubmit}>
                    {/* <LoginWithGithub redirect={redirectAfterLogin} /> */}
                    {/* <LoginWithGoogle redirect={redirectAfterLogin} /> */}
                    {/* <LoginWithFacebook redirect={redirectAfterLogin} /> */}

                    <div className ='card'>
                        <label htmlFor="username">ชื่อผู้ใช้</label>
                        <input
                            type="text"
                            id="username"
                            ref={usernameRef}
                            autoComplete="off"
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                            required
                        />

                        <label htmlFor="password">รหัสผ่าน</label>
                        <input
                            type="password"
                            id="password"
                            onChange={e => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <div className ='signin'>
                            <br/>
                        {/* <button id='loginbutton' className ='button'>Sign In</button> */}
                        <button id='loginbutton' className ='button'>เข้าสู่ระบบ</button>
                        </div>

                        <p className ='wantaccount'>
                            {/* Need an Account? */}
                            หากยังไม่มีบัญชี
                            <br />
                            <span className="wantregister">
                                {/* <Link to="/register">Sign Up</Link> */}
                                <Link to="/register">สมัครใช้งาน</Link>
                            </span>
                        </p>
                    </div>
                </form>
            </section>
        </React.Fragment>
    );
};