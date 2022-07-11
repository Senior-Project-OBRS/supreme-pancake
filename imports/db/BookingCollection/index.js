import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const BookingCollection = new Mongo.Collection('booking');

const BookingSchemas = new SimpleSchema({
    bus_scheduleId: {
        type: String,
        label: "Bus schedule",
        optional: true
    },

    userId: {
        type: String,
        label: "User",
        optional: true
    },

    bookingNo: {
        type: String,
        label: "Booking Number",
        optional: true
    },

    total_fare: {
        type: Number,
        label: 'Bus Fare',
        optional: true
    },

    charge: {
        type: Object,
        label: "Charge",
        optional: true,
        blackbox: true
    },

    contactInfo: {
        type: Array,
        optional: true
    },

    "contactInfo.$": {
        type: Object
    },

    "contactInfo.$.titleName": {
        type: String,
        label: "Title Name"
    },

    "contactInfo.$.firstName": {
        type: String,
        label: "First Name"
    },

    "contactInfo.$.middleName": {
        type: String,
        label: "Middle Name",
        optional: true
    },

    "contactInfo.$.lastName": {
        type: String,
        label: "Last Name"
    },

    "contactInfo.$.phoneNo": {
        type: String,
        label: "Phone Number"
    },

    "contactInfo.$.email": {
        type: String,
        label: "Email"
    },

    passengersInfo: {
        type: Array,
        optional: true
    },

    "passengersInfo.$": {
        type: Object
    },

    "passengersInfo.$.titleName": {
        type: String,
        label: "Title Name"
    },

    "passengersInfo.$.firstName": {
        type: String,
        label: "First Name"
    },

    "passengersInfo.$.middleName": {
        type: String,
        label: "Middle Name",
        optional: true
    },

    "passengersInfo.$.lastName": {
        type: String,
        label: "Last Name"
    },

    "passengersInfo.$.birthDate": {
        type: Date,
        label: "Birth Date"
    },

    "passengersInfo.$.status": {
        type: String,
        label: "Passenger Status"
    },

    pickUp_point: {
        type: String,
        label: "Pick up point",
        optional: true
    },

    dropOff_point: {
        type: String,
        label: "Drop off point",
        optional: true
    },

    status: {
        type: String,
        label: "Status",
        optional: true
    },

    createdAt: {
        type: Date,
        label: "Created at",
        optional: true
    },

    canceledAt: {
        type: Date,
        label: "Canceled At",
        optional: true
    }
});

BookingCollection.attachSchema(BookingSchemas);

export default BookingCollection;