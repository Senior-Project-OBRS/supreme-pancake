import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { createQuery } from 'meteor/cultofcoders:grapher';

import Bus_scheduleCollection from '../../db/Bus_scheduleCollection';
import BookingCollection from '../../db/BookingCollection';

import BOOKING_status from '../../utils/enums/status/BOOKING_status';

if (Meteor.isServer) {
    Meteor.methods({
        'booking.createBooking'(bus_scheduleId, deptStation, arrStation, contactInfo, passengersInfo, total_fare) {
            check(bus_scheduleId, String);
            check(deptStation, String);
            check(arrStation, String);
            check(contactInfo, [{
                titleName: String,
                firstName: String,
                middleName: String,
                lastName: String,
                phoneNo: String,
                email: String
            }]);
            check(passengersInfo, [{
                titleName: String,
                firstName: String,
                middleName: String,
                lastName: String,
                birthDate: String,
                status: String
            }]);
            check(total_fare, Number);
            
            Bus_scheduleCollection.update(bus_scheduleId, {
                '$inc': {
                    occupied_seat: passengersInfo.length
                }
            });

            // create & check duplicate bookingNo 
            let bookingNo;
            while (true) {
                bookingNo = Date.now().toString().slice(5);

                const found = BookingCollection.findOne({ bookingNo });
                if (!found) break;
            }

            const status = BOOKING_status.pre_payment;
            
            const bookingId = BookingCollection.insert({
                bus_scheduleId, 
                userId: this.userId ? this.userId : '',

                bookingNo,
                contactInfo,
                passengersInfo,
                total_fare,
               
                
                pickUp_point: deptStation,
                dropOff_point: arrStation,
                
                status,
                createdAt: new Date
            });

            return { bookingId, bookingNo, status };
        },

        'booking.findBookingById'(bookingId) {
            check(bookingId, String);

            const bookingQuery = BookingCollection.createQuery({
                $filters: { _id: bookingId },

                bookingNo: 1,
                pickUp_point: 1,
                dropOff_point: 1,
                createdAt: 1,
                status: 1,
                contactInfo: {
                    phoneNo: 1,
                },
                passengersInfo: 1,

                charge: {
                    paidBy: 1,
                    amount: 1,
                    status: 1
                },

                bus_schedule: {
                    deptDate: 1,
                    deptTime: 1
                }
            });

            if (!bookingQuery) throw new Meteor.Error('Access Denied.');

            return bookingQuery.fetchOne();
        },

        'booking.findBookingByChargeId'(charge) {
            check(charge, Object);

            const booking = BookingCollection.findOne({ "charge._id": charge.id });
            if (!booking) throw new Meteor.Error('Access Denied.');

            return booking;
        },
        
        'booking.findBookingByBus_scheduleId'(bus_scheduleId) {
            check(bus_scheduleId, String);

            const bookingList = BookingCollection.createQuery({
                $filters: { 
                    bus_scheduleId,
                    status: { $ne: BOOKING_status.cancel } 
                },

                passengersInfo: 1,
                status: 1,

                bus_schedule: {
                    deptDate: 1,
                    deptTime: 1,
                    occupied_seat: 1,

                    route: {
                        name: 1
                    },

                    bus: {
                        total_seating: 1
                    },
                },
            }).fetch();
            if (!bookingList.length) return [];

            return bookingList;
        },

        'booking.findAllBookingsByUserId'(userId) {
            check(userId, String);

            const allBookings = BookingCollection.createQuery({
                $filters: { userId },
               
                bookingNo: 1,
                pickUp_point: 1,
                dropOff_point: 1,
                createdAt: 1,
                status: 1,
                total_fare: 1,
                contactInfo: {
                    phoneNo: 1
                },
                passengersInfo: {
                    firstName:1
                },
                
                bus_schedule: {
                    deptDate: 1,
                    deptTime: 1,

                    route: {
                        name: 1,
                        details: 1,
                    }
                },

                user: {
                    _id: 1
                }
            });

            return allBookings.fetch();
        },

        'booking.findBookingByBookingNo'(bookingNo) {
            check(bookingNo, String);

            const booking = BookingCollection.findOne({ bookingNo });
            if (!booking) throw new Meteor.Error('Access Denied.');

            return booking;
        },

        'booking.accessBookingBy_bookingNo_phoneNo'(bookingNo, phoneNo) {
            check(bookingNo, String);
            check(phoneNo, String);

            const booking = BookingCollection.findOne({ bookingNo });
            if (!booking) throw new Meteor.Error('Access Denied.');

            const mobileNo = booking.contactInfo[0].phoneNo;
            if (phoneNo !== mobileNo) throw new Meteor.Error('Incorrect Phone Number.');
            
            return booking._id;
        },

        'booking.requestCheckout'(bookingId, charge) {
            check(bookingId, String);

            const booking = BookingCollection.findOne({ _id: bookingId });
            if (!booking) throw new Meteor.Error('Access Denied.');

            // check payment options
            let payer_name, paidBy;

            if (charge.card !== null) {     // credit-card 
                payer_name = charge.card.name;
                paidBy = 'Credit/Debit Card';
            } else {                        // non-credit-card
                payer_name = charge.source.name;
                paidBy = charge.source.type;
            }
            
            // update document
            const passengerList = booking.passengersInfo;
            passengerList.forEach((pax, idx) => {
                passengerList[idx].status = BOOKING_status.mid_payment;
            });

            BookingCollection.update(bookingId, {
                $set: {
                    status: BOOKING_status.mid_payment,

                    charge: {
                        _id: charge.id,
                        paidBy: paidBy,
                        name: payer_name,
                        amount: charge.amount / 100,    // convert stang to baht
                        status: charge.status,
                        paidAt: charge.paid_at
                    },

                    passengersInfo: passengerList
                }
            });
        },

        'booking.makePayment'(charge) {
            check(charge, Object);
            
            // check target booking
            const booking = BookingCollection.findOne({ "charge._id": charge.id });
            if (!booking) throw new Meteor.Error('Access Denied.');

            // update document
            const passengerList = booking.passengersInfo;
            passengerList.forEach((pax, idx) => {
                passengerList[idx].status = BOOKING_status.post_payment;
            });

            BookingCollection.update(booking._id, {
                $set: {
                    status: BOOKING_status.post_payment,
                    "charge.status": charge.status,  // "successful"
                    passengersInfo: passengerList
                }
            });

            return booking;
        },

        'booking.changeDepartureDatetime'(bookingId, newBus_scheduleId) {
            check(bookingId, String);
            check(newBus_scheduleId, String);
            
            const booking = BookingCollection.findOne({ _id: bookingId });
            if (!booking) throw new Meteor.Error('Access denied.');
            
            // update related documents
            const passengersInfo = booking.passengersInfo;
            const oldBus_scheduleId = booking.bus_scheduleId;

            // 1) change bus schedule 
            BookingCollection.update(bookingId, {
                $set: {
                    bus_scheduleId: newBus_scheduleId
                }
            });

            // 2) edit occupied_seat in old bus schedule
            Bus_scheduleCollection.update(oldBus_scheduleId, {
                '$inc': {
                    occupied_seat: -passengersInfo.length
                }
            });

            // 3) edit occupied_seat in new bus schedule
            Bus_scheduleCollection.update(newBus_scheduleId, {
                '$inc': {
                    occupied_seat: passengersInfo.length
                }
            });
        },

        'booking.cancel'(bookingId) {
            check(bookingId, String);

            // check target booking
            const booking = BookingCollection.findOne({ _id: bookingId });
            if (!booking) throw new Meteor.Error('Cannot delete booking, does not exist.');
            
            // update bus_schedule occupied_seat
            const bus_scheduleId = booking.bus_scheduleId;
            const passengersInfo = booking.passengersInfo;

            Bus_scheduleCollection.update(bus_scheduleId, {
                '$inc': {
                    occupied_seat: -passengersInfo.length
                }
            });

            // cancel related document
            BookingCollection.update(bookingId, {
                $set: {
                    status: BOOKING_status.cancel,
                    canceledAt: new Date
                }
            });

            Meteor.call('ticket.findAllTicketsByBookingId', bookingId, (error, result) => {
                if (result.length) {
                    Meteor.call('ticket.cancelByBookingId', bookingId);
                }
            });
            
            const bookingNo = booking.bookingNo;
            const amount = booking.charge.amount;

            return {
                bookingNo,
                amount
            };
        },

        'booking.remove'(bookingId) {
            check(bookingId, String);

            // check target booking
            const booking = BookingCollection.findOne({ _id: bookingId });
            if (!booking) throw new Meteor.Error('Cannot delete booking, does not exist.');
            
            // update bus_schedule occupied_seat
            const bus_scheduleId = booking.bus_scheduleId;
            const passengersInfo = booking.passengersInfo;

            Bus_scheduleCollection.update(bus_scheduleId, {
                '$inc': {
                    occupied_seat: -passengersInfo.length
                }
            });

            // remove related document
            BookingCollection.remove({ _id: bookingId });

            Meteor.call('ticket.findAllTicketsByBookingId', bookingId, (error, result) => {
                if (result.length) {
                    Meteor.call('ticket.removeByBookingId', bookingId);
                }
            });
    
            return true;
        }
    });
};