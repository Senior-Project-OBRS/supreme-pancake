import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert } from 'chai';
import RouteCollection from '../../db/RouteCollection';

import './routeMethods';


if (Meteor.isServer) {
    describe('route', () => {
        describe('methods', () => {
            const userId = Random.id();
            let routeId;

            beforeEach(() => {
                RouteCollection.remove({});
                routeId = RouteCollection.insert({
                    name: 'A - B',
                    srcStation:{province:'bkk',bus_stop:['mc']},
                    dstnStation:{province:'chb',bus_stop:['nr']},
                    createdAt: new Date,
                    userId
                });
               
            });

            it('can delete route by all salesperson', () => {
                mockMethodCall('RemoveRoute', routeId, {
                    context: { userId }
                });

                assert.equal(RouteCollection.find().count(), 0);
            });
         

            it('cant delete route by without user authen', () => {
                const fn = () =>  mockMethodCall('RemoveRoute', routeId);
            
                assert.throw(fn,/Not authorized/)
                assert.equal(RouteCollection.find().count(), 1);
            
            });
            
            
            it('can create new route', () => {
                const name =  'D - E';
                const srcStation = {province:'a',bus_stop:['a']};
                const dstnStation = {province:'f',bus_stop:['a']};
                mockMethodCall('CreateRoute', name,srcStation,dstnStation, {
                    context: { userId },
                });
                const routes =  RouteCollection.find({}).fetch();
                assert.equal(RouteCollection.find().count(), 2);
                // assert.isFalse(buses.some(bus => bus.plate_number === plate_number));
             });
        });
    });
}