import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert } from 'chai';

import './usersMethods';


// const testUser = {
//     email: 'test@test.test',
//     password: 'test'
// }

if (Meteor.isServer) {
    describe('Users', () => {
        describe('methods', () => {
            const roles = ['customer'];
            const userId = Random.id();
            let testUser;

            beforeEach(() => {
                Meteor.users.remove({});
                testUser = Meteor.users.insert({
                    email: 'test@user.com',
                    username: 'testUser',
                    password: 'password',
                    profile: {
                        roles
                    },
                });
            });

      

            it('cant changed role by self' , () => {
                const newRole = ['salesperson'];
                fn = () => mockMethodCall('users.changeRoles',newRole,testUser, { context: { testUser }});
                

                const users = Meteor.users.find({}).fetch();
                assert(fn,/Not authorized/)
                assert.equal(users.length, 1);
                assert.isTrue(users.some(userr => userr.profile.roles === ['customer'] ))
            });

            it('can create user account', () => {
                const newUser = {
                    email: 'test@test.test',
                    username: 'mindtest',
                    password: 'password'
                };
                mockMethodCall('CreateUserByEmail', newUser);

                const users = Meteor.users.find({}).fetch();
                assert.equal(users.length, 2);
                
                // const user = Meteor.users.find().fetch();
                // assert.isTrue(user.some(newuser => newuser.email === 'test@test.test'));
                
            });

          
        });
    });
}