import TicketCollection from ".";
import BookingCollection from '../BookingCollection';

TicketCollection.addLinks({
    'booking': {
        type: 'one',
        collection: BookingCollection,
        field: 'bookingId',
    }
});