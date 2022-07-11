import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const TicketCollection = new Mongo.Collection('ticket');

const TicketSchemas = new SimpleSchema({
    bookingId: {
        type: String,
        label: "Booking",
        optional: true
    },

    titleName: {
        type: String,
        label: "Title Name",
        optional: true
    },

    firstName: {
        type: String,
        label: "First Name",
        optional: true
    },

    middleName: {
        type: String,
        label: "Middle Name",
        optional: true
    },

    lastName: {
        type: String,
        label: "Last Name",
        optional: true
    },

    birthDate: {
        type: String,
        label: "Birth Date",
        optional: true
    },

    status: {
        type: String,
        label: "Status",
        optional: true
    },

    createdAt: {
        type: Date,
        label: "Created At",
        optional: true
    },

    canceledAt: {
        type: Date,
        label: "Canceled At",
        optional: true
    }
});

TicketCollection.attachSchema(TicketSchemas);

export default TicketCollection;