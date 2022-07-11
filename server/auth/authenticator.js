import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

import ROLES from '../../imports/utils/enums/USER_role';

// Generate user initials after External Service login
Accounts.onCreateUser((options, user) => {
    const facebook = user.services?.facebook;
    const github = user.services?.github;
    const google = user.services?.google;

    if (options.profile) { 
        // Meteor.loginWithPassword
        user.profile = options.profile;
        const register_roles = options.profile.roles;

        Roles.createRole(register_roles, { unlessExists: true });
        Roles.addUsersToRoles(user._id, register_roles);

        return user;
    } else if (facebook) {
        if (!user.emails) {
            user.emails = [{ 
                address: facebook.email,
                verified: true 
            }];
        }

        if (!user.username) {
            user.username = _.startCase([facebook.name]).replace(/ /g, '');
        }

        if (!user.profile) {
            user.profile = {
                firstName: facebook.first_name,
                lastName: facebook.last_name,
                // gender: facebook.gender
            }
        }
        
        return user;
    } else if (github) {
        if (!user.username) user.username = github.profile.name;

        return user;
    } else if (google) {
        if (!user.emails) {
            user.emails = [{ 
                address: google.email,
                verified: true 
            }];
        }

        if (!user.username) {
            user.username = _.startCase([google.name]).replace(/ /g, '');
        }

        if (!user.profile) {
            user.profile = {
                firstName: google.given_name,
                lastName: google.family_name,
                // gender: google.gender
            }
        }
        
        return user;
    } 

    return user;
});