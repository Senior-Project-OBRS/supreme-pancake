import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const RefundCollection = new Mongo.Collection('refund');

const RefundSchemas = new SimpleSchema({
    bookingId: {
        type: String,
        label: 'Booking',
        optional: true
    },

    recipientAccount: {
        type: Object,
        label: 'Recipient Account',
        optional: true,
        blackbox: true
    },

    amount: {
        type: Number,
        label: 'Amount',
        optional: true
    },

    status: {
        type: String,
        label: 'Status',
        optional: true
    },

    createdAt: {
        type: Date,
        label: "Created at",
        optional: true
    },

    refundedAt: {
        type: Date,
        label: "Refunded at",
        optional: true
    },
});

RefundCollection.attachSchema(RefundSchemas);

export default RefundCollection;