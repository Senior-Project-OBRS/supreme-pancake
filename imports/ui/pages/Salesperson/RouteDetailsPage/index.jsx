import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

import AddRouteDetails from "./AddRouteDetails";

import Spinner from '../../../components/Spinner';
import Table from '../../../components/Table';

export default RouteDetailsPage = () => {
    const [route, setRoute] = useState({});
    const state = useLocation().state;

    useEffect(() => {
        let isSubscribed = true;

        if (state !== null) {
            const { routeId } = state;

            Meteor.call('routes.find', routeId, (error, result) => {
                if (error) {
                    console.error(error);
                    alert('ไม่สามารถเรียกดูรายการเส้นทางได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
                } else if (isSubscribed && result) {
                    setRoute(result);
                }
            });
        }

        // cleanup function
        return () => {
            isSubscribed = false;
        }
    });

    return (
        <React.Fragment>
            <div>
                <h2 className='headroutedetail'>อัตราค่าโดยสาร และระยะเวลาเดินทางแต่ละคู่สาย</h2>

                <AddRouteDetails route={route} />
            </div>
        </React.Fragment>
    );
};