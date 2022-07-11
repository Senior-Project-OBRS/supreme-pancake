import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Navigate } from 'react-router-dom';

import ROLES from '../../utils/enums/USER_role';

if (Meteor.isServer) {
    Meteor.methods({
        'CreateUserByEmail'(newUser) {
            check(newUser, {
                email: String,
                username: String,
                password: String
            });

            // each email address can only belong to one user.
            const duplicateEmail = Accounts.findUserByEmail(newUser.email);
            if (duplicateEmail) throw new Meteor.Error('Duplicate Email in creating account.');
    
            if (!newUser.username) {
                const email = newUser.email;
                newUser.username = email.split('@')[0];
            }   

            // unique username
            const duplicateUsername = Accounts.findUserByUsername(newUser.username);
            if (duplicateUsername) throw new Meteor.Error('Duplicate Username in creating account.');
            alert('Duplicate Username in creating account')
            Accounts.createUser(newUser);
        },

        'FindUserById'(userId) {
            check(userId, String);  // why or use for what WTF
            
            if (!this.userId) throw new Meteor.Error('Not authorized.');

            const user = Meteor.users.findOne({ _id: userId });
            if (!user) throw new Meteor.Error("User doesn't exist.");

            return user;
        },

        'FindUserByUsername'(username) {
            check(username, String);
            
            const user = Meteor.users.findOne({ username: username });
            if (!user) throw new Meteor.Error("User doesn't exist.");

            return user;
        },

        'FindUserByEmail'(email) {
            check(email, String);
            
            const user = Meteor.users.findOne({ "emails.address": email });
            if (!user) throw new Meteor.Error("User doesn't exist.");

            return user;
        },

        'RemoveUserById'(userId) {
            check(userId, String);

            if (!this.userId) throw new Meteor.Error('Not authorized.');
    
            const user = Meteor.users.findOne({ _id: userId });
            if (!user) throw new Meteor.Error('Cannot delete user, does not exist.');
            
            Roles.setUserRoles(userId, []);
            Meteor.users.remove({ _id: userId });

            if (userId === this.userId) {
                return <Navigate to="/" />
            }

            return true;
        },

        'users.findUsersByRole'(role) {
            // check permission
            if (!this.userId || !Meteor.users.findOne(this.userId) || !Roles.userIsInRole(this.userId, [ROLES.Admin, ROLES.Salesperson])) {
                throw new Meteor.Error('403', 'forbidden', 'you have no permission to change roles');
            }

            const users = Meteor.users.find({ 'profile.roles': role }).fetch();
            return users;
        },

        'users.username.update'(userId, newUsername) {
            if (!this.userId) {
                throw new Meteor.Error('Not authorized.');
            }
    
            const duplicate = Accounts.findUserByUsername(username);
            if (duplicate) {
                throw new Meteor.Error('Duplicate Username in updating account.');
            }
    
            const usernameValidator = /^[A-z][A-z0-9-_]{3,23}$/;
            if (usernameValidator.test(newUsername)) {
                Meteor.users.update(
                    { _id: userId },
                    { 
                        $set: {
                            username: newUsername
                        }
                    }
                );
            }
        },

        'users.emails.update'(userId, newEmail) {
            if (!this.userId) {
                throw new Meteor.Error('Not authorized.');
            }
    
            const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (emailValidator.test(newEmail)) {
                Meteor.users.update(
                    { _id: userId },
                    { 
                        $set: {
                            'emails.0.address': newEmail
                        }
                    }
                );
            }
        },

        'users.password.update'(userId, newPassword) {  
            if (!this.userId) {
                throw new Meteor.Error('Not authorized.');
            }
    
            const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
            if (passwordValidator.test(newPassword)) {
                Accounts.setPassword(userId, newPassword, { logout: false })
            }
        },

        'users.profile.update'(userId, profile) {
            if (!this.userId) {
                throw new Meteor.Error('Not authorized.');
            }
            
            Meteor.users.update(
                { _id: userId },
                { 
                    $set: {
                        profile: profile
                    }
                }
            );
        },

        'users.updateRoles'(userId, newRole) {
            // check permission
            if (!this.userId || !Meteor.users.findOne(this.userId) || !Roles.userIsInRole(this.userId, ROLES.Admin)) {
                throw new Meteor.Error('403', 'forbidden', 'you have no permission to change roles');
            }

            // check target user
            if (!Meteor.users.findOne(userId)) {
                throw new Meteor.Error('404', 'user not found');
            }

            // update user's role
            Roles.setUserRoles(userId, newRole);

            Meteor.users.update(userId, {
                $set: {
                    "profile.roles": newRole
                }
            });

            return true;
        },
    });
}