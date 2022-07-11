import { Meteor } from 'meteor/meteor';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import { TimeProvider } from '../imports/context/TimerContext';
import Footer from '../imports/ui/layouts/Footer';
import App from '../imports/ui/App';

Meteor.startup(() => {
    ReactDOM.render(
        <React.Fragment>
            <React.StrictMode>
                <Router>
                    {/* <TimeProvider> */}
                        <Routes>
                            <Route path="/*" element={<App />} /> 
                        </Routes>
                    {/* </TimeProvider> */}
                </Router>
            </React.StrictMode>

            <Footer/>
        </React.Fragment>,
            
        document.getElementById('react-app')
    );
});