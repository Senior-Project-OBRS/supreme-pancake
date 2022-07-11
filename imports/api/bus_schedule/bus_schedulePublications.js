import { Meteor } from 'meteor/meteor';
import Bus_scheduleCollection from '../../db/Bus_scheduleCollection';

Meteor.publish('bus_schedules', () => {
    return Bus_scheduleCollection.find();
});