import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { createQuery } from 'meteor/cultofcoders:grapher';

import BookingCollection from '../../db/BookingCollection';
import RefundCollection from '../../db/RefundCollection';

import REFUND_status from '../../utils/enums/status/REFUND_status';

if (Meteor.isServer) {
    Meteor.methods({
        'refund.createByBookingid'(bookingId, recipientAccount, amount) {
            check(bookingId, String);
            check(recipientAccount, Object);
            check(amount, Number);

            const refundId = RefundCollection.insert({
                bookingId,

                recipientAccount,
                amount: amount * 9/10,    // fee 10% 
                status: REFUND_status.pre_refund,
                createdAt: new Date
            });

            return refundId;
        },

        'refund.findAll'() {
            const allRefund = RefundCollection.createQuery({
                recipientAccount: 1,
                amount: 1,
                status: 1,
                refundedAt: 1,

                booking: {
                    bookingNo: 1,
                    canceledAt: 1
                },
            });

            return allRefund.fetch();
        },

        'refund.refunded_successfully'(refundId) {
            check(refundId, String);

            // check target refund
            const refund = RefundCollection.findOne({ _id: refundId });
            if (!refund) throw new Meteor.Error('Access Denied.');

            // update document
            const new_status = REFUND_status.post_refund;
            
            RefundCollection.update(refundId, {
                $set: {
                    status: new_status,
                    // refundedAt: new Date
                }
            })

            return new_status;
        },
    });
}