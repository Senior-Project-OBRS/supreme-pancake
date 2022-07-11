import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const RouteCollection = new Mongo.Collection('route');

const RouteSchemas = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },

    srcStation: {
        type: Object,
        label: "Source Station"
    },
    "srcStation.province": String,
    "srcStation.bus_stop": [String],

    dstnStation: {
        type: Object,
        label: "Destination Station"
    },
    "dstnStation.province": String,
    "dstnStation.bus_stop": [String],

    details: {
        type: Array,
        label: "Details",
        optional: true,
    },
    "details.$": {
        type: Object,
        blackbox: true
    },

    createdAt: {
        type: Date,
        label: "Created At",
        optional: true
    }
});

RouteCollection.attachSchema(RouteSchemas);

export default RouteCollection;