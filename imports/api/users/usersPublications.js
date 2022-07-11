import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import ROLES from '../../utils/enums/USER_role';

const customFields = {
    fields: {
        _id: true,
        username: true,
        password: true,
        emails: true,
        createdAt: true,
        profile: {
            firstName: true,
            lastName: true,
            role: true
        }
    }
}

if (Meteor.isServer) {
    
    // Global publication does not a require subscription from the connected client
    Meteor.publish(null, function() {
        if (this.userId) {
            return Meteor.roleAssignment.find({ 'user._id': this.userId });
        } else {
            return this.ready();
        }
    });

    Meteor.publish("usersData", function() {
        if (Roles.userIsInRole(this.userId, [ROLES.Admin])) {
            return Meteor.users.find({});
        } else {
            return Meteor.users.find({ _id: this.userId }, customFields);
        }
    });
};