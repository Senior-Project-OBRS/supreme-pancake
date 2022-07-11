import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import BusCollection from '../../db/BusCollection';
import Bus_scheduleCollection from '../../db/Bus_scheduleCollection';

if (Meteor.isServer) {
    Meteor.methods({
        'bus.insert'(plate_number, type,total_seating) {
            check(type, String);
            check(total_seating, Number);

            // check salesperson role
            if (!this.userId) throw new Meteor.Error('Not authorized.');
       
            const duplicatePlateNo = BusCollection.findOne({ plate_number });
            if (duplicatePlateNo) throw new Meteor.Error('Duplicate Plate number in adding bus.');
              
            return BusCollection.insert({
                plate_number,
                type,
                total_seating,
                createdAt: new Date,
            //   userId
            });
        },

        'bus.findAll'() {
            let query = BusCollection.createQuery({
               plate_number : 1,
               type : 1,
               total_seating : 1,
            });

            return query.fetch();
        },

        'bus.remove'(busId) {
            if (!this.userId) throw new Meteor.Error('Not authorized.');

            // check target bus
            const bus = BusCollection.findOne({ _id: busId });
            if (!bus) throw new Meteor.Error('Cannot delete bus, does not exist.');
            
            // remove related document
            BusCollection.remove({ _id: busId });

            const bus_scheduleList = Bus_scheduleCollection.find({ busId }).fetch();
            if (bus_scheduleList.length) {
                bus_scheduleList.forEach(bus_schedule => {
                    Meteor.call('bus_schedule.remove', bus_schedule._id);
                });
            }

            return true;
        }
    })
}