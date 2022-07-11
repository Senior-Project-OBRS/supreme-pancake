import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert } from 'chai';
import BusCollection from '../../db/BusCollection';

import './busMethods';


if (Meteor.isServer) {
    describe('bus', () => {
        describe('methods', () => {
            const userId = Random.id();
            let busId;

            beforeEach(() => {
                BusCollection.remove({});
                busId = BusCollection.insert({
                    plate_number: 'กข 1254',
                    type:'bus',
                    total_seating:12,
                    createAt: new Date(),
                    userId,
                });
               
            });

            it('can delete by another user', () => {
                mockMethodCall('bus.delete', busId, {
                    context: { userId }
                });

                assert.equal(BusCollection.find().count(), 0);
            });

            it('cant delete bus by without user authen', () => {
                const fn = () =>  mockMethodCall('bus.delete',busId);
            
                assert.throw(fn,/Not authorized/)
                assert.equal(BusCollection.find().count(), 1);
            
            });
            
            
            it('can insert new bus', () => {
                const plate_number = 'กข 1258';
                const type = 'bus';
                const total_seating = 12;
                    mockMethodCall('bus.insert', plate_number,type,total_seating, {
                    context: { userId },
                });
                // const buses =  BusCollection.find({}).fetch();
                assert.equal(BusCollection.find().count(), 2);
            
             });

             it('cant insert new bus with duplicate plateNo', () => {
                const plate_number = 'กข 1254';
                const type = 'bus';
                const total_seating = 12;
                const fn = () => mockMethodCall('bus.insert', plate_number,type,total_seating, {
                    context: { userId },
                });
                assert.throw(fn,/Duplicate Plate number in adding bus/)
                assert.equal(BusCollection.find().count(), 1);
              
             });
        });
    });
}