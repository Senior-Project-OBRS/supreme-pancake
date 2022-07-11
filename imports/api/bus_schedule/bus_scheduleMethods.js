import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { createQuery } from 'meteor/cultofcoders:grapher';

import Bus_scheduleCollection from '../../db/Bus_scheduleCollection';
import BookingCollection from '../../db/BookingCollection';


if (Meteor.isServer) {
    Meteor.methods({
        'CreateBus_schedule'(routeId, deptDate, deptTime, busId, driverId) {
            // check salesperson role
            if (!this.userId) throw new Meteor.Error('Not authorized.');
            
            check(routeId, String);
            check(deptDate, String); 
            check(deptTime, String);
            check(busId, String);
            check(driverId, String)
            
            const duplicateBus_schedule = Bus_scheduleCollection.findOne({ routeId , deptDate , deptTime ,busId });
            if (duplicateBus_schedule) throw new Meteor.Error('Duplicate bus schedule');

            return Bus_scheduleCollection.insert({
                routeId,
                busId,
                driverId, 

                deptDate,
                deptTime,
                occupied_seat: 0,
                createdAt: new Date             
            });
        },

        'bus_schedule.findAll'() {
            let query = Bus_scheduleCollection.createQuery({
                route: {
                    name: 1,                
                },

                deptDate: 1,
                deptTime: 1,

                bus: {
                    plate_number: 1,
                    total_seating: 1,
                },

                driver: {
                    profile: {
                        firstName: 1,
                        lastName: 1,
                        gender: 1
                    }
                }
            });

            return query.fetch();
        },

        'bus_schedule.findByDate'(date) {
            check(date, String);

            const query = Bus_scheduleCollection.createQuery({
                $filters: { deptDate: date },
                deptTime: 1,

                route: {
                    name: 1
                },

                driver: {
                    profile: {
                        firstName: 1,
                        lastName: 1
                    }
                }
            });

            return query.fetch();
        },

        /* Poor performance: fetch unrelated documents that value in field is not in filter */
        'bus_schedule.find'(deptStation, arrStation, deptDate, NoPassengers) {
            check(deptStation, String);
            check(arrStation, String);
            check(deptDate, String);
            
            const journeyName = `${deptStation} - ${arrStation}`;

            const query = Bus_scheduleCollection.createQuery({
                $filters: { deptDate },
                deptTime: 1,
                occupied_seat: 1,

                route: {
                    $filters: {
                        'details.journey': journeyName, 
                    },
                    name: 1,
                    details: 1,
                },

                bus: {
                    total_seating: 1
                }
            });

            return query.fetch();
        },

        'bus_schedule.getBusSeatingCapacity'(bus_scheduleId) {
            const query = Bus_scheduleCollection.createQuery({
                $filters: { _id: bus_scheduleId },
                occupied_seat: 1,

                bus: {
                    total_seating: 1
                }
            });

            return query.fetchOne();
        },

        'bus_schedule.remove'(bus_scheduleId) {
            check(bus_scheduleId, String);
            
            if (!this.userId) throw new Meteor.Error('Not authorized.');

            // check target bus_schedule
            const bus_schedule = Bus_scheduleCollection.findOne({ _id: bus_scheduleId });
            if (!bus_schedule) throw new Meteor.Error('Cannot delete bus schedule, does not exist.');

            // remove related document
            Bus_scheduleCollection.remove({ _id: bus_scheduleId });

            const bookings = BookingCollection.find({ bus_scheduleId }).fetch();
            if (bookings.length) {
                bookings.forEach(booking => {
                    Meteor.call('booking.cancel', booking._id); 
                }); 
            }     

            return true;
        }

        
    });
}