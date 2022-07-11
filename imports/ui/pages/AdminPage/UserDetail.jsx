import React from "react";
import { useParams } from 'react-router-dom';

const UserDetail = () => {
    let { userId } = useParams();
    
    return (
        <h3>User ID: {userId}</h3>
    );
};

export default UserDetail;