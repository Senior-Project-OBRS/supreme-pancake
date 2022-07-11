import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert } from 'chai';
import TicketCollection from '../../db/TicketCollection';

import './ticketMethods';


if (Meteor.isServer) {
    describe('ticket', () => {
        describe('methods', () => {
            const userId = Random.id();
            let ticketId;

            beforeEach(() => {
                TicketCollection.remove({});
                ticketId = TicketCollection.insert({
                    bookingId:Random.id(),
                
                    titleName:'testtname',
                    firstName: 'testfname',
                    middleName: 'testmidname',
                    lastName: 'testlastname',
                    birthDate: 'testbirthdate',
    
                    createdAt: new Date,
                    status: "not checked in",
                    
                    
                    userId,
                });
               
            });
            ///test ตั๋วที่่เช็คอินแล้ว
            it('Customer can check-in', () => {
                mockMethodCall('ticket.makeCheck-in',ticketId, {
                    context: { userId }
                });
                const tickets = TicketCollection.find({}).fetch();
                assert.isTrue(tickets.some(ticket => ticket.status === 'already checked in'));
            });
            
            it('can insert ticket', () => {
                const titleName = 'testtname'
         
                    mockMethodCall('ticket.insert',titleName, {
                    context: { userId },
                });
                
                assert.equal(TicketCollection.find().count(), 2);
             });
        });
    });
}