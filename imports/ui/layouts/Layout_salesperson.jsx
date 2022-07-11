import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Container, Navbar, Nav,  NavDropdown,DropdownButton, Dropdown } from 'react-bootstrap';
import './layout.css';

export default Layout_salesperson = () => {
    const user = useTracker(() => Meteor.user());
    const navigate = useNavigate();

    const logout = () => {
        Meteor.logout();
        navigate('/'); 
    }

    return (     
        <main className='App'>
            <Navbar className="navbar navbar-light" bg="light" expand="lg" >
                <a className="navbar-brand" href="#"></a>
                <Container>
                    <Navbar.Brand href="/">
                       <h2 className='headText'> NJ Phuyaipu</h2>
                    </Navbar.Brand>
                    <Nav.Link className='linkText'href="/agent">หน้าแรก</Nav.Link>  
                    <Nav.Link className='linkText'href="/agent/refund">รายการคืนเงิน</Nav.Link>      
                    <NavDropdown className='linkText' title="การจัดการ" id="navbarScrollingDropdown">
          <NavDropdown.Item  className='linkText'href="/agent/bus_schedule">ตารางเดินรถ</NavDropdown.Item>
          <NavDropdown.Item className='linkText' href="/agent/bus">รถโดยสาร</NavDropdown.Item>
          <NavDropdown.Item className='linkText' href="/agent/route_details">ราคาตั๋ว</NavDropdown.Item>
          <NavDropdown.Item className='linkText'href="/agent/route">เส้นทางเดินรถ</NavDropdown.Item>

        </NavDropdown>
                          
                    {/* <Nav.Link className='linkText'href="/agent/bus_schedule">ตารางเดินรถ</Nav.Link>
                    <Nav.Link className='linkText' href="/agent/bus">รถโดยสาร</Nav.Link>
                    <Nav.Link className='linkText' href="/agent/route_details">ราคาตั๋ว</Nav.Link>
                    <Nav.Link className='linkText'href="/agent/route">เส้นทางเดินรถ</Nav.Link>                                  */}

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <div className="me-auto">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />    
                                

                                <Dropdown.Item>
                                    {user ? ( 
                                        <div className="user" onClick={() => logout()}>
                                            {user.username}
                                        </div> 
                                    ) : (
                                        <Dropdown.Item href= "/login">เข้าสู่ระบบ</Dropdown.Item>
                                    )}
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                
                                <Dropdown.Item href="agent/check-in">เช็คอิน</Dropdown.Item>
                                <Dropdown.Item href="agent/bus_schedule">ตารางเดินรถ</Dropdown.Item>
                                <Dropdown.Item href="agent/bus">รถโดยสาร</Dropdown.Item>
                                <Dropdown.Item href="agent/route_details">ราคาตั๋ว</Dropdown.Item>
                                <Dropdown.Item href="agent/route">เส้นทางเดินรถ</Dropdown.Item>
                                <Dropdown.Item href="agent/refund">รายการคืนเงิน</Dropdown.Item>

                                
                            
                            </div>
                       
                        <Nav>
                            <div className='usertext'>
                                {user ? (
                                    <div className="user" onClick={() => logout()}>
                                        {user.username}
                                    </div>
                                ) : (
                                    <Button href= "/login" variant="success">Login</Button>
                                )}
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </main>
    )
}