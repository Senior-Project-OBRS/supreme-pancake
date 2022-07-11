import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Container, Navbar, Nav, Dropdown } from 'react-bootstrap';

import './layout.css';

export default Layout_customer = () => {
    const user = useTracker(() => Meteor.user());
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        Meteor.logout();
        navigate('/'); 
    };

    return (     
        <main className='App'>
            <Navbar className="navbar navbar-light" bg="light"expand="lg" >
                <a className="navbar-brand" href="#"></a>
                <Container>
                    <Navbar.Brand href="/">
                        <h2 onClick='opennav' className='headText'> NJ Phuyaipu</h2>  
                    </Navbar.Brand>
                    <Nav.Link className='linkText'href="/about">เกี่ยวกับเรา</Nav.Link>
                    <Nav.Link className='linkText'href="/mybookings">My Bookings</Nav.Link>
                    <Nav.Link className='linkText'href="/howpayment">วิธีการชำระเงิน</Nav.Link>
                    <Nav.Link className='linkText'href="/refund-policy">คืนตั๋ว</Nav.Link>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />    

                    <Navbar.Collapse id="basic-navbar-nav">
                        <div className="me-auto">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />    
                                
                                <Dropdown.Divider />
                                
                                <Dropdown.Item>
                                {user ? 
                                ( <div className="user" onClick={() => logout()}>
                                        {user.username}
                                </div> 
                                ) : 
                                (
                                    <Dropdown.Item href= "/login">เข้าสู่ระบบ</Dropdown.Item>
                                )}
                                </Dropdown.Item>
                                <Dropdown.Item href="/about">หน้าแรก</Dropdown.Item>
                                <Dropdown.Item href="/mybookings">My Bookings</Dropdown.Item>
                                <Dropdown.Item href="/about">วิธีการชำระเงิน</Dropdown.Item>
                                <Dropdown.Item href="/refund-policy">คืนตั๋ว</Dropdown.Item>
                        </div>

                        <Nav>
                            <div className = 'usertext'>   
                                {user ? (
                                    <div className="user" onClick={() => logout()}>
                                        {user.username}                        
                                    </div>  
                                ) : (
                                    <Button className="btn btn-danger dropdown-toggle" variant="success">
                                        <Link 
                                            to="/login" state={{ from: location }} replace 
                                            style={{ textDecoration: 'none', color: '#FFF' }}
                                        >
                                            เข้าสู่ระบบ
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />  
        </main>  
    );
};