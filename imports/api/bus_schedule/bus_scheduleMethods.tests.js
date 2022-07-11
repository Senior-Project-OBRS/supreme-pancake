import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert } from 'chai';
import Bus_scheduleCollection from '../../db/Bus_scheduleCollection';

import './bus_scheduleMethods';


if (Meteor.isServer) {
    describe('bus_schedule', () => {
        describe('methods', () => {
            const userId = Random.id();
            let bus_scheduleId;

            beforeEach(() => {
                Bus_scheduleCollection.remove({});
                bus_scheduleId = Bus_scheduleCollection.insert({
                    routeId:Random.id(),
                    busId:Random.id(),
                    driverId:Random.id(),
    
                    deptDate:'12/10/2565',
                    deptTime:'12.00',
                    occupied_seat: 0,
                    createAt: new Date(),
                    userId,
                });
               
            });

            it('can delete by another user', () => {
                mockMethodCall('RemoveBus_schedule', bus_scheduleId, {
                    context: { userId }
                });

                assert.equal(Bus_scheduleCollection.find().count(), 0);
            });

            it('cant delete bus_schedule by without user authen', () => {
                const fn = () =>  mockMethodCall('RemoveBus_schedule',bus_scheduleId);
            
                assert.throw(fn,/Not authorized/)
                assert.equal(Bus_scheduleCollection.find().count(), 1);
            
            });
            
            
            it('can create new bus_schedule', () => {
                const routeId = Random.id();
                const busId = Random.id();
                const driverId = Random.id();
                const deptDate = '12/01/2565';
                const deptTime = '12.00';
                const occupied_seat = 0;
                    
                 mockMethodCall('CreateBus_schedule', routeId,busId,driverId,deptDate,deptTime,occupied_seat,{
                    context: { userId },
                });
                const bus_schedule =  Bus_scheduleCollection.find({}).fetch();
                assert.equal(Bus_scheduleCollection.find().count(), 2);
                // assert.isFalse(buses.some(bus => bus.plate_number === plate_number));
             });
        });
    });
}