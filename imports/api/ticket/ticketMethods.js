import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { createQuery } from 'meteor/cultofcoders:grapher';

import TicketCollection from '../../db/TicketCollection';
import BookingCollection from '../../db/BookingCollection';

import BOOKING_status from '../../utils/enums/status/BOOKING_status';
import TICKET_status from '../../utils/enums/status/TICKET_status';

if (Meteor.isServer) {
    Meteor.methods({
        'ticket.insert'(bookingId, paxInfo) {
            check(bookingId, String);
            check(paxInfo, Object);

            return TicketCollection.insert({
                bookingId,
                
                titleName: paxInfo.titleName,
                firstName: paxInfo.firstName,
                middleName: paxInfo.middleName,
                lastName: paxInfo.lastName,
                birthDate: paxInfo.birthDate,

                createdAt: new Date,
                status: TICKET_status.pre_checkin
            });
        },

        'ticket.createTicketByBookingId'(booking) {
            check(booking, Object);

            booking.passengersInfo.forEach(paxInfo => {
                Meteor.call('ticket.insert', booking._id, paxInfo);
            });

            return true;
        },
        
        'ticket.findAllTicketsByBookingId'(bookingId) {
            check(bookingId, String);

            const allTickets = TicketCollection.createQuery({
                $filters: { bookingId },

                titleName: 1,
                firstName: 1,
                middleName: 1,
                lastName: 1,
                birthDate: 1,
                createdAt: 1,
                status: 1,

                booking: {
                    bookingNo: 1,
                    pickUp_point: 1,
                    dropOff_point: 1,
                    createdAt: 1,
                    status: 1,
                    
                    contactInfo: {
                        titleName: 1,
                        firstName: 1,
                        lastName: 1,
                        phoneNo: 1,
                        email: 1
                    },

                    user: {
                        _id: 1
                    },

                    bus_schedule: {
                        deptDate: 1,
                        deptTime: 1,
    
                        route: {
                            name: 1,
                            srcStation: {
                                province :1
                            },
                            dstnStation: {
                                province :1
                            }
                        },
    
                        bus: {
                            plate_number: 1
                        }
                    }
                }
            });

            return allTickets.fetch();
        },

        'ticket.findTicketBy_firstName_lastName'(firstName, lastName) {
            check(firstName, String);
            check(firstName, String);

            const ticket = TicketCollection.findOne({ 
                firstName,
                lastName
            });
            if (!ticket) throw new Meteor.Error('Access Denied.');

            return ticket;
        },

        /* Poor performance: fetch unrelated documents that value in field is not in filter */
        'ticket.findByBus_scheduleId'(bus_scheduleId) {
            check(bus_scheduleId, String);

            const tickets = TicketCollection.createQuery({
                titleName: 1,
                firstName: 1,
                middleName: 1,
                lastName: 1,
                status: 1,

                booking: {
                    bus_schedule: {
                        $filters: { _id: bus_scheduleId },
                        deptDate: 1,
                        deptTime: 1,
                        occupied_seat: 1,

                        route: {
                            name: 1
                        },

                        bus: {
                            total_seating: 1
                        }
                    }
                }
            });

            return tickets.fetch();
        },

        'ticket.makeCheck-in'(ticketId) {
            check(ticketId, String);

            // check target ticket
            const ticket = TicketCollection.findOne({ _id: ticketId });
            if (!ticket) throw new Meteor.Error('Access denied.');

            // update ticket status
            TicketCollection.update(ticketId, {
                $set: {
                    status: TICKET_status.post_checkin
                }
            });

            // update passenger status in BookingCollection
            const bookingId = ticket.bookingId; 
            const firstName = ticket.firstName;
            const lastName = ticket.lastName;
            
            BookingCollection.update(bookingId, {
                "passengersInfo.firstName": firstName,
                "passengersInfo.lastName": lastName
            }, {
                $set: {
                    "passengersInfo.$.status": TICKET_status.post_checkin
                }
            });

            // Is group checked in ?
            const booking = BookingCollection.findOne({ _id: bookingId });
            const passengerList = booking.passengersInfo;
            const not_checkedIn_exist = passengerList.findIndex(pax => pax.status !== TICKET_status.post_checkin);

            if (!not_checkedIn_exist) {
                BookingCollection.update(bookingId, {
                    $set: {
                        status: BOOKING_status.group_checkIn
                    }
                })
            }

            return true;
        },

        'ticket.cancelByBookingId'(bookingId) {
            check(bookingId, String);

            const ticketList = TicketCollection.find({ bookingId }).fetch();
            if (!ticketList.length) throw new Meteor.Error('Cannot cancel ticket, does not exist.');

            TicketCollection.update({ 
                bookingId 
            }, {
                $set: {
                    status: TICKET_status.cancel,
                    canceledAt: new Date
                }
            });

            return true;
        },

        'ticket.removeByBookingId'(bookingId) {
            check(bookingId, String);

            const ticketList = TicketCollection.find({ bookingId }).fetch();
            if (!ticketList.length) throw new Meteor.Error('Cannot delete ticket, does not exist.');

            TicketCollection.remove({ bookingId });

            return true;
        },
    });
}