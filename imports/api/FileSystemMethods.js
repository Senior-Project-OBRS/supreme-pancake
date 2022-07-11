import { Meteor } from 'meteor/meteor';

const fs = require('fs');

// Only on server-side
if (Meteor.isServer) {
    Meteor.methods({
        'ReadFile'(path) {
            // check path
            return fs.readFileSync(path, 'utf8', (err) => {
                if (err) throw err;
            });
        },

        'WriteFile'(path, data) {
            // check path
            const json = JSON.stringify(data, null, 2);

            fs.writeFile(path, json, 'utf8', (err) => {
                if (err) throw err;
            });
        }
    });
}