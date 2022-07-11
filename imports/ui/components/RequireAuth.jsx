import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';

import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

export default RequireAuth = ({ allowedRoles }) => {
    const userId = Meteor.userId();
    const location = useLocation();

    if (!userId) return <Navigate to="/login" state={{ from: location }} replace />

    const isInRole = allowedRoles.find(role => Roles.userIsInRole(userId, role));     // check role in userId
    const { getRole } = useTracker(() => {
        return {
            getRole: Roles.getRolesForUser(userId),
        };
    });

    let buffer = getRole.length;
    if (buffer != 0) {
        return isInRole
                ? <Outlet /> 
                : <Navigate to="/unauthorized" state={{ from: location }} replace />
    }

    return (
        <div>
            Just a moment..
        </div>
    );
};