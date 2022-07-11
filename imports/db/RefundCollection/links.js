import { Meteor } from 'meteor/meteor';

import RefundCollection from '.';
import BookingCollection from '../BookingCollection';

RefundCollection.addLinks({
    'booking': {
        type: 'one',
        collection: BookingCollection,
        field: 'bookingId'
    }
});