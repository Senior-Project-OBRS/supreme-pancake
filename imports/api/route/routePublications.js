import { Meteor } from 'meteor/meteor';
import RouteCollection from '../../db/RouteCollection';

if (Meteor.isServer) {
    Meteor.publish('routes', () => {
        return RouteCollection.find();
    });

    Meteor.publish('srcStations', () => {
        return RouteCollection.find({}, {
            fields: {
                _id: true,
                srcStation: {
                    province: true,
                    bus_stop: true
                } 
            }
        });
    });

    Meteor.publish('dstnStations', () => {
        return RouteCollection.find({}, {
            fields: {
                _id: true,
                dstnStation: {
                    province: true,
                    bus_stop: true
                } 
            }
        });
    });
};