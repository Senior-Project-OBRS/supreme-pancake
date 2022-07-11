import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { createQuery } from 'meteor/cultofcoders:grapher';

import RouteCollection from '../../db/RouteCollection';
import Bus_scheduleCollection from '../../db/Bus_scheduleCollection';

if (Meteor.isServer) {
    Meteor.methods({
        'CreateRoute'(name, srcStation, dstnStation) {
            // check salesperson role
            if (!this.userId) throw new Meteor.Error('Not authorized.');
            
            check(name, String);
            check(srcStation, {
                province: String,
                bus_stop: [String]
            });
            check(dstnStation, {
                province: String,
                bus_stop: [String]
            });
            
            const duplicateRouteName = RouteCollection.findOne({ name });
            if (duplicateRouteName) throw new Meteor.Error('Duplicate route name');
              

            return RouteCollection.insert({
                name,
                srcStation,
                dstnStation,
                createdAt: new Date,
                userId: this.userId
            });
        },

        'route.findAll'() {
            let query = RouteCollection.createQuery({
                name: 1,

                srcStation: {
                    province: 1,
                    bus_stop: 1
                },

                dstnStation: {
                    province: 1,
                    bus_stop: 1
                },
            });
            return query.fetch();
        },

        'route.findAllDetails'() {
            let query = RouteCollection.createQuery({
                name: 1,

                srcStation: {
                    province: 1,
                    bus_stop: 1
                },

                dstnStation: {
                    province: 1,
                    bus_stop: 1
                },

                details: 1,
            });
            return query.fetch();
        },

        'routes.find'(routeId) {
            check(routeId, String);

            if (!this.userId) throw new Meteor.Error('Not authorized.');
            
            const foundRoute = RouteCollection.findOne({ _id: routeId });
            if (!foundRoute) throw new Meteor.Error('Access Denied.');

            return foundRoute;
        },

        'route.addDetails'(routeId, details) {
            check(routeId, String);
            check(details, [Object]);

            if (!this.userId) throw new Meteor.Error('Not authorized.');

            const foundRoute = RouteCollection.findOne({ _id: routeId });
            if (!foundRoute) throw new Meteor.Error('Access Denied.');
            
            RouteCollection.update(routeId, {
                $set: {
                    details
                }
            });

            return true;
        },

        'route.remove'(routeId) {
            if (!this.userId) throw new Meteor.Error('Not authorized.');

            // check target route
            const route = RouteCollection.findOne({ _id: routeId });
            if (!route) throw new Meteor.Error('Cannot delete route, does not exist.');

            // remove related document
            RouteCollection.remove({ _id: routeId });

            const bus_scheduleList = Bus_scheduleCollection.find({ routeId }).fetch();
            if (bus_scheduleList.length) {
                bus_scheduleList.forEach(bus_schedule => {
                    Meteor.call('bus_schedule.remove', bus_schedule._id);
                });
            }

            return true;
        }
    });
}