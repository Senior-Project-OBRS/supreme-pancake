import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { WebApp } from 'meteor/webapp';

/* global WebApp Assets */
import connectRoute from 'connect-route'

import './startup/addExampleUsers';
import './startup/addExampleBus_schedules';

/* User APIs */ 
import '../imports/api/users/usersPublications';
import '../imports/api/users/usersMethods';

/* OAuth */
import './auth/tokenService';
import './auth/authenticator';

import '../imports/api/sendEmailMethods';
import '../imports/api/emails';

import '../imports/api/FileSystemMethods';

/* Salesperson APIs */
import '../imports/api/bus/busMethods';
import '../imports/api/bus/busPublications';

import '../imports/api/route/routeMethods';
import '../imports/api/route/routePublications';

import '../imports/api/bus_schedule/bus_scheduleMethods';
import '../imports/api/bus_schedule/bus_schedulePublications';

/* Customer APIs */
import '../imports/api/booking/bookingMethods';
import '../imports/api/ticket/ticketMethods';
import '../imports/api/refund/refundMethods';

/* db links APIs */
import '../imports/db/Bus_scheduleCollection/links';
import '../imports/db/BookingCollection/links';
import '../imports/db/TicketCollection/links';
import '../imports/db/RefundCollection/links';

/* Picker: Server Side Router */ 
import './routes'

// const serveStatic = Meteor.

// WebApp.connectHandlers.use(connectRoute((router) => {
//     router.get('/hello', (req, res, next) => {
//         res.writeHead(200, 'success')
//         return res.end('something');
//     });
// })); 