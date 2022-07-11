import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

import ROLES from '../../imports/utils/enums/USER_role';

const users = [
    { 
        username: 'admin', 
        email: 'admin@email.com',
        password: 'password', 
        firstName: 'A',
        lastName: 'a',
        roles: ROLES.Admin 
    },
    { 
        username: 'salesperson', 
        email: 'salesperson@email.com',
        password: 'password', 
        firstName: 'B',
        lastName: 'b',
        roles: ROLES.Salesperson
    },
    { 
        username: 'driver', 
        email: 'driver@email.com',
        password: 'password', 
        firstName: 'C',
        lastName: 'c',
        roles: ROLES.Driver
    },
    { 
        username: 'customer', 
        email: 'customer@email.com',
        password: 'password', 
        firstName: 'D',
        lastName: 'd',
        roles: ROLES.Customer
    },
    { 
        username: 'admintest', 
        email: 'addtest@gmail.com',
        password: 'password', 
        firstName: 'AA',
        lastName: 'AA',
        roles: ROLES.Admin
    },
];

Meteor.startup(() => {
    users.forEach(user => {
        if (!Accounts.findUserByUsername(user.username)) {
            const userId = Accounts.createUser({
                username: user.username,
                email: user.email,
                password: user.password,
                profile: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    roles: user.roles
                }
            });
    
            if (Meteor.roleAssignment.find({ 'user._id': userId }).count() === 0) {
                Roles.createRole(user.roles, { unlessExists: true });
                Roles.addUsersToRoles(userId, user.roles);
            }

            console.log(`Add example user: ${user.username}`);
        }
    });
});