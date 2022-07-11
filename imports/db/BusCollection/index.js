import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const BusCollection = new Mongo.Collection('bus');

const BusSchemas = new SimpleSchema({
    plate_number: {
        type: String,
        label: "Plate Number"
    },

    type: {
        type: String,
        label: "Type"
    },

    total_seating: {
        type: Number,
        label: "Total Seating"
    },

    createdAt: {
        type: Date,
        label: "Created At",
        optional: true
    }
});

BusCollection.attachSchema(BusSchemas);

export default BusCollection;