import React from "react";
import { Routes, Route } from 'react-router-dom'; // Link component make web app doesn't re-render that makes

import Layout_customer from './layouts/Layout_customer';
import Layout_salesperson from './layouts/Layout_salesperson';
import Layout_admin from './layouts/Layout_admin';
import Layout_driver from './layouts/Layout_driver';

/* Business Policy */
import Terms_and_Conditions from './pages/BusinessPolicy/Terms_and_Conditions';
import PrivacyPolicy from './pages/BusinessPolicy/PrivacyPolicy';
import DataProtectionPolicy from "./pages/BusinessPolicy/DataProtectionPolicy";
import RefundPolicy from "./pages/BusinessPolicy/RefundPolicy";

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import RequireAuth from './components/RequireAuth';
import AuthenticatedPage from './pages/AuthenticatedPage';
import VerifyEmailPage from "./pages/VerifyEmailPage";

/* Admin */
import Admin from './pages/AdminPage';

/* Customer */
  /* Book Page */
import SearchBus_schedule from './pages/Customer/BookPage/Step01-SearchBus_schedule';
import ShowSearchResults from './pages/Customer/BookPage/Step02-ShowSearchResults';
import ConfirmBus_schedule from './pages/Customer/BookPage/Step03-ConfirmBus_schedule';
import BookBus_schedule from './pages/Customer/BookPage/Step04-BookBus_schedule';
import Checkout from './pages/Customer/BookPage/Step05-Checkout';
import PromptPayQR_codePage from './pages/Customer/BookPage/Step05-Checkout/PromptPayQR_codePage';
import MessagePage from "./pages/Customer/BookPage/Step05-Checkout/MessagePage";

  /* My Bookings Page */
import MyBookingsPage from './pages/Customer/MyBookingsPage';
import BookingDetails from "./pages/Customer/MyBookingsPage/BookingDetails";
import IdentifyBooking from './pages/Customer/MyBookingsPage/IdentifyBooking';

  /* Check-in Page */
import SelectTicket from './pages/Customer/CheckInPage/Step01-SelectTicket';
import ShowQRcode from './pages/Customer/CheckInPage/Step02-ShowQRcode';

  /* Change Bus_schedule Page */
import FindBus_schedule from './pages/Customer/ChangeBus_schedulePage/Step01-FindBus_schedule';
import DisplaySearchResults from './pages/Customer/ChangeBus_schedulePage/Step02-DisplaySearchResults';
import ConfirmChangeBus_schedule from './pages/Customer/ChangeBus_schedulePage/Step03-ConfirmChangeBus_schedule';

    /* Cancel Booking Page */
import CancelPage from "./pages/Customer/CancelPage";

/* Salesperson */
import HomePage from './pages/Salesperson/HomePage';
import BusPage from "./pages/Salesperson/BusPage";
import RoutePage from "./pages/Salesperson/RoutePage";
import Bus_schedulePage from "./pages/Salesperson/Bus_schedulePage";
import RouteDetailsPage from './pages/Salesperson/RouteDetailsPage';
import CheckInbyOfficerPage from './pages/Salesperson/CheckInbyOfficerPage';
import RefundPage from './pages/Salesperson/RefundPage';

/* Static Pages */
import About from './pages/StaticPages/AboutPage';
import HowPayment from './pages/StaticPages/HowPayment';
import Missing from './pages/StaticPages/MissingPage';
import Unauthorized from './pages/StaticPages/UnauthorizedPage';
import QRTEST from './pages/StaticPages/QRTEST';

import ROLES from '../utils/enums/USER_role';

export default App = () => {
    return ( 
        <Routes>

            {/* public routes */}
            <Route path="/" element={<Layout_customer />}>
                <Route path="about" element={<About />} />
                <Route path="howpayment" element={<HowPayment />} />

                <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="unauthorized" element={<Unauthorized />} />

                <Route path="authenticated" element={<AuthenticatedPage />} />
                <Route path="verify-email/:token" element={<VerifyEmailPage />} />

                {/* Business Policy */}
                <Route path='terms-and-conditions' element={<Terms_and_Conditions />} />
                <Route path='privacy-policy' element={<PrivacyPolicy />} />
                <Route path='dataprotection-policy' element={<DataProtectionPolicy />} />
                <Route path='refund-policy' element={<RefundPolicy />} />
                
                {/* Book Page */}
                <Route path="/" element={<SearchBus_schedule />} />
                <Route path="bus_schedule">
                <Route path="search" element={<ShowSearchResults />} />
                <Route path="confirm" element={<ConfirmBus_schedule />} />
                <Route path="book" element={<BookBus_schedule />} /> 
                <Route path="checkout" element={<Checkout />} />
                <Route path="checkout/promptpay" element={<PromptPayQR_codePage />} />
                <Route path="message/:bookingId" element={<MessagePage />} />
                </Route>

                {/* My Bookings Page */}
                <Route path="mybookings" element={<MyBookingsPage />} />
                <Route path="mybooking/:bookingId" element={<BookingDetails />} />
                <Route path="mybooking/identify" element={<IdentifyBooking />} />

                {/* Check-in Page */}
                <Route path="check-in/:bookingId" element={<SelectTicket />} />
                <Route path="check-in/:bookingId/confirm" element={<ShowQRcode />} />
                <Route path='qr' element={<QRTEST />} />

                {/* Change Bus_schedule Page */}
                <Route path="changeBus_schedule/:bookingId" element={<FindBus_schedule />} />
                <Route path="changeBus_schedule/:bookingId/search" element={<DisplaySearchResults />} />
                <Route path="changeBus_schedule/:bookingId/confirm" element={<ConfirmChangeBus_schedule />} />

                {/* Cancel Booking Page */}
                <Route path="cancelBooking/:bookingId" element={<CancelPage />} />
            </Route>
            
            {/* Admin Role */}
            <Route path='admin' element={<RequireAuth allowedRoles={[ROLES.Admin]}/>} >
                <Route element={<Layout_admin />}>
                    <Route path='' element={<Admin />} />
                </Route>
            </Route>
            
            {/* Driver Role */}
            <Route path='agent' element={<RequireAuth allowedRoles={[ROLES.Driver, ROLES.Admin, ROLES.Salesperson]}/>} >
                <Route element={<Layout_driver />} >
                    <Route path ='check-in'element={<CheckInbyOfficerPage />} />
                    <Route path='driver' element ={<HomePage />} />
                </Route>
            </Route>

            {/* Salesperson Role */}
            <Route path='agent' element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Salesperson]}/>} >
                <Route element={<Layout_salesperson />} >
                    <Route path='' element={<HomePage />} />
                    <Route path='bus' element={<BusPage />} />
                    <Route path='route' element={<RoutePage />} />
                    <Route path='bus_schedule' element={<Bus_schedulePage />} />
                    <Route path='route_details' element={<RouteDetailsPage />} />
                    <Route path='check-in' element={<CheckInbyOfficerPage />} />
                    <Route path='refund' element={<RefundPage />} />
                </Route>
            </Route>
                    
            {/* catch all */}
            <Route path="*" element={<Missing />} />          
        </Routes>
    );
};