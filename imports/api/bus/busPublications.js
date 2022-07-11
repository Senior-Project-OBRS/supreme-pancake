import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';

import BusCollection from '../../db/BusCollection';

Meteor.publish('buses', () => {
    return BusCollection.find();
});