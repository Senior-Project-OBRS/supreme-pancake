import { Meteor } from 'meteor/meteor';

import Bus_scheduleCollection from ".";
import RouteCollection from '../RouteCollection';
import BusCollection from '../BusCollection';

Bus_scheduleCollection.addLinks({
    'route': {
        type: 'one',
        collection: RouteCollection,
        field: 'routeId',
    },

    'bus': {
        type: 'one',
        collection: BusCollection,
        field: 'busId',
    },

    'driver': {
        type: 'one',
        collection: Meteor.users,
        field: 'driverId',
    }
});