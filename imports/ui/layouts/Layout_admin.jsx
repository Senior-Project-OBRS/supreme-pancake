import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import './layout.css';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Container, Navbar, Nav ,Dropdown ,DropdownButton, NavDropdown } from 'react-bootstrap';

export default Layout_admin = () => {
    const user = useTracker(() => Meteor.user());
    const navigate = useNavigate();

    const logout = () => {
        Meteor.logout();
        navigate('/'); 
    }

    return (     
        <main className='App'>
            <Navbar className="navbar navbar-light" bg="light"expand="lg" >
                <a className="navbar-brand" href="#"></a>
                <Container>
                    <Navbar.Brand href="/">
                    
                      <h2 onClick = 'opennav' className ='headText'> NJ Phuyaipu</h2>
                      
                    </Navbar.Brand>
                    
                    {/* <Nav.Link className ='linkText' href="/about">เกี่ยวกับเรา</Nav.Link> */}
                
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />    
                    <Navbar.Collapse id="basic-navbar-nav">

                    <div className="me-auto">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />    
                                

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
                                <Dropdown.Divider />
                                
                                {/* <Dropdown.Item href="/about">หน้าแรก</Dropdown.Item> */}
                            
                                
                                
                            
                            </div>

                        
                  
                        <Nav>
                            <div className = 'usertext'>
                                
                                {user ? (
                                    <div className="user" onClick={() => logout()}>
                                        {user.username}
                                        
                                    </div>
                                    
                                ) : (
                                    <Button className="btn btn-danger dropdown-toggle" href= "/login" variant="success">Login</Button>
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