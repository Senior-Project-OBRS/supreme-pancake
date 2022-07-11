import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

const Schemas = {};

Schemas.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        label: "First name",
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true
    },
    lastName: {
        type: String,
        label: "Last name",
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true
    },
    gender: {
        type: String,
        optional: true
    },
    roles: {
        type: String,
        label: "Roles",
        optional: true
    },
    birthday: {
        type: Date,
        label: "Birthday",
        optional: true
    },
    bio: {
        type: String,
        label: "Bio",
        optional: true
    }
});

Schemas.User = new SimpleSchema({
    username: {
        type: String,
        label: "Username"
    },
    emails: {
        type: [Object],
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date,
        label: "Created At"
    },
    profile: {
        type: Schemas.UserProfile,
        optional: true,
        blackbox: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true  // to skip validation for all properties in the object
    },
    'services.JWTLogin.$.hashedToken': {
        type: String,
        optional: true
    },
    'services.JWTLogin.$.when': {
        type: Date,
        optional: true
    },
    'services.password.bcrypt': {
        type: String
    }
});

Meteor.users.attachSchema(Schemas.User);