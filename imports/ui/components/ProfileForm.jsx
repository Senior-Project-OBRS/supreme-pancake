import { Meteor } from 'meteor/meteor';
import React, { useState } from "react";

export const ProfileForm = () => {
    const [profile, setProfile] = useState({
        firstName: Meteor.user().profile.firstName,
        lastName: Meteor.user().profile.lastName
    });

    const updateUserProfile = e => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        })

        if (profile) {
            Meteor.user.update(userId, {
                $set: {
                    "profile": profile
                }
            })
        };

        e.preventDefault();
    }

    const { firstName, lastName } = profile;

    return (
        <form onSubmit={updateUserProfile}>
            <input
                value={firstName}
                onChange={e => updateUserProfile(e)}
                placeholder={profile.firstName}
                type="text"
                name="firstname"
                required
            />

            <input
                value={lastName}
                onChange={e => updateUserProfile(e)}
                placeholder={profile.lastName}
                type="text"
                name="lastname"
                required
            />

            <button type="submit">Submit</button>
        </form>
    );
};