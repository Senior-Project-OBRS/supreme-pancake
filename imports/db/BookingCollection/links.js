import { Meteor } from 'meteor/meteor';

import BookingCollection from ".";
import Bus_scheduleCollection from '../Bus_scheduleCollection';

BookingCollection.addLinks({
    'user': {
        type: 'one',
        collection: Meteor.users,
        field: 'userId',
    },

    'bus_schedule': {
        type: 'one',
        collection: Bus_scheduleCollection,
        field: 'bus_scheduleId',
    }
});