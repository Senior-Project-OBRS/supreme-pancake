import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Bus_scheduleCollection = new Mongo.Collection('bus_schedule');

const Bus_scheduleSchemas = new SimpleSchema({
    deptDate: {
        type: String,
        label: "Departure Date"
    },

    deptTime: {
        type: String,
        label: "Departure Time"
    },

    createdAt: {
        type: Date,
        label: "Created At",
        optional: true
    },

    occupied_seat: {
        type: Number,
        label: "Occupied Seat",
        optional: true
    },

    routeId: {
        type: String,
        label: "Route"
    },

    busId: {
        type: String,
        label: "Bus"
    },

    driverId: {
        type: String,
        label: "Driver"
    }
});

Bus_scheduleCollection.attachSchema(Bus_scheduleSchemas);

export default Bus_scheduleCollection;