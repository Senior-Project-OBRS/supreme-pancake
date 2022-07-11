import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert } from 'chai';
import Bus_scheduleCollection from '../../db/Bus_scheduleCollection';
import BookingCollection from '../../db/BookingCollection';
import TicketCollection from '../../db/TicketCollection';


import './bookingMethods';



if (Meteor.isServer) {
    describe('booking', () => {
        describe('methods', () => {
            const userId = Random.id();
            let bookingId;

            beforeEach(() => {
                BookingCollection.remove({});
                 
                bookingId = BookingCollection.insert({
                    bus_scheduleId: _id,
                    bookingNo: Random.id(),
                    contactInfo: {titleName:'mr',
                                firstName:'saksit',
                                middleName:'',
                                lastName:'wilainuch',
                                phoneNo:'0842019185',
                                email:'saksit.wn@gmail.com'},
                    passengersInfo: {titleName:'mr',
                                    firstName:'saksit',
                                    middleName:'',
                                    lastName:'wilainuch',
                                    birthDate:'10/11/1998'},
                
                    pickUp_point:  {province:'bkk',bus_stop:['mc']},
                    dropOff_point:  {province:'chb',bus_stop:['nr']},
                    status: 'pending payment',
                    charge:'test',
                    createdAt: new Date
                });
               
            });
            it('booking can payment', () => { 
               
                mockMethodCall('booking.makePayment',bookingId,{
                    context: { userId }
                });
                const bus_schedule = Bus_scheduleCollection.find({}).fetch();
                assert.isTrue(bus_schedule.some(bus_schedule=> bus_schedule.status === 'purchased'));
            });
        
        
        });
    });
}