import React from 'react';

// Ref. Options key: https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date/33131823
const options = {
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
};

export const User = ({ user, onDeleteClick }) => {
    return (
        <div>
            <button onClick={() => onDeleteClick(user)}>&times;</button>
            <li>
                Username: {
                    !!user.username 
                        ? user.username
                        : 'NA'
                } 
            </li>
            <li>
                User ID: {user._id} 
            </li>
            <li>
                Created At: { 
                    user.createdAt ?
                    user.createdAt.toLocaleString('en-GB', options) : null
                }
            </li>
            <li>
                E-mail: {
                    !!user.emails
                        ? user.emails[0].address
                        : 'NA'
                } <br />
                {/* verified: {user.emails[0].verified} ##### */}
            </li>
            <li>Password: {user.password} ###############</li>
            {!!user.profile ? (
                <li>
                    First name: {
                        !!user.profile.firstName
                            ? user.profile.firstName
                            : 'NA'
                    } <br />
                    Last name: {
                        !!user.profile.lastName
                            ? user.profile.lastName
                            : 'NA'
                    } <br />
                    Role: {
                        !!user.profile.role
                            ? user.profile.role
                            : 'NA' 
                    }
                </li>
            ) : (
                <div>
                    No profile
                </div>
            ) }
    
            ---------------------------------------------------------
        </div>
    );
};