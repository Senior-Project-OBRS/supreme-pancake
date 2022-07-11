import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import moment from 'moment';

import "./bus_schedule.css";

import RouteCollection from '../../../../db/RouteCollection';
import BusCollection from '../../../../db/BusCollection';

import ROLES from '../../../../utils/enums/USER_role';
import { isObjectEmpty, isObjectNotEmpty } from '../../../../utils/objectUtils';
import Spinner from '../../../components/Spinner';

export default AddBus_schedule = ({ handleCreate }) => {
    const [route, setRoute] = useState({});
    const [bus, setBus] = useState({});
    const [driver, setDriver] = useState({});
    const [deptDate, setDeptDate] = useState('');   // 2022-04-26
    const [deptTime, setDeptTime] = useState('');   // 20:00

    const [driverList, setDriverList] = useState([]);

    const { routeList, routeIsLoading } = useTracker(() => {
        const routeHandler = Meteor.subscribe('routes');
        const noDataAvailable = { routeList: [] };

        if (!routeHandler.ready()) return { ...noDataAvailable, routeIsLoading: true };
        
        return {
            routeList: RouteCollection.find().fetch(),
            routeIsLoading: false
        };
    });

    const { busList, busIsLoading } = useTracker(() => {
        const busHandler = Meteor.subscribe('buses');
        const noDataAvailable = { busList: [] };

        if (!busHandler.ready()) return { ...noDataAvailable, busIsLoading: true };
        
        return {
            busList: BusCollection.find().fetch(),
            busIsLoading: false
        };
    });

    useEffect(() => {
        let isSubscribed = true;

        Meteor.call('users.findUsersByRole', ROLES.Driver, (error, result) => {
            if (error) {
                console.error(error);
                alert('ไม่สามารถเรียกดูรายชื่อคนขับรถได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
            } else if (result && isSubscribed) {
                setDriverList(result);
            }
        });

        // cleanup function
        return () => {
            isSubscribed = false;
        };
    });

    const routeOptions = () => {
        if (!routeList.length) return;
        
        return routeList.map(obj => ({
            label: obj.name,
            value: {
                _id: obj._id,
                name: obj.name,
                label: obj.name
            }
        }));
    };

    const busOptions = () => {
        if (!busList.length) return;
        
        return busList.map(obj => ({
            label: `${obj.plate_number} (${obj.total_seating} seating)`,
            value: {
                _id: obj._id,
                plate_number: obj.plate_number,
                total_seating: obj.total_seating,
                label: `${obj.plate_number} (${obj.total_seating} seating)`
            }
        }));
    };

    const driverOptions = () => {
        if (!driverList.length) return;
        
        return driverList.map(obj => ({
            label: `${obj.profile.firstName} ${obj.profile.lastName}`,
            value: {
                _id: obj._id,
                firstName: obj.profile.firstName,
                lastName: obj.profile.lastName,
                label: `${obj.profile.firstName} ${obj.profile.lastName}`
            }
        }));
    };

    const handleOnChange_route = e => {
        if (e) {
            setRoute(e.value);
        } else {
            setRoute({});
            setBus({});
        }
    };

    const handleOnChange_bus = e => {
        if (e) {
            setBus(e.value);
        } else {
            setBus({});
        }
    };

    const handleOnChange_driver = e => {
        if (e) {
            setDriver(e.value);
        } else {
            setDriver({});
        }
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (isObjectEmpty(route)) {
            // alert('Required Route !');
            alert('กรุณาระบุเส้นทาง');
        } else if (isObjectEmpty(bus)) {
            // alert('Required Bus !');
            alert('กรุณาระบุรถโดยสาร');
        } else if (isObjectEmpty(driver)) {
            // alert('Required Driver !');
            alert('กรุณาระบุคนขับรถ');
        } else {
            Meteor.call('CreateBus_schedule', route._id, deptDate, deptTime, bus._id, driver._id, (error, result) => {
                if (error) {
                    console.error(error);
                    alert('มีรอบรถอยู่ในระบบอยู่แล้ว กรุณาลองใหม่อีกครั้ง');
                } else if (result) {
                    setRoute({});
                    setBus({});
                    setDriver({});
                    setDeptDate('');
                    setDeptTime('');
    
                    handleCreate(result, route, deptDate, deptTime, bus, driver);
                }
            });
        }
    };

    return (
        <React.Fragment>
            {busIsLoading && routeIsLoading ? (
                <Spinner />
            ) : (
                <form className ='addsc'onSubmit={handleSubmit}>
                 
                    <div className ='card'>
                        {/* <label>Route</label> */}
                        <label>เส้นทาง</label>
                        <Select 
                            id = 'selectroute'
                            // value={ {label: isObjectNotEmpty(route) ? `${route.label}` : "--Select Route--"} }
                            value={ {label: isObjectNotEmpty(route) ? `${route.label}` : "--เลือกเส้นทาง--"} }
                            options={routeOptions()}
                            onChange={handleOnChange_route}
                            isClearable
                        />
                    
                        {/* <label>Add Date</label> */}
                        <label>วันที่เดินทาง</label>
                        <input 
                            id = 'date'
                            type="date"
                            value={deptDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={e => setDeptDate(e.target.value)}
                            required
                        />
                    
                        {/* <label>Add Time</label> */}
                        <label>เวลาเดินทาง</label>
                        <input 
                            id = 'time'
                            type="time"
                            step="300"
                            value={deptTime}
                            min="07:30" max="17:30"
                            onChange={e => setDeptTime(e.target.value)}
                            required  
                        />
                    
                        {/* <label>Add Bus</label> */}
                        <label>รถโดยสาร</label>
                        <Select 
                            id='selectbus'
                            // value={ {label: isObjectNotEmpty(bus) ? bus.label : "--Select Bus--"} }
                            value={ {label: isObjectNotEmpty(bus) ? bus.label : "--เลือกรถโดยสาร--"} }
                            options={busOptions()}
                            onChange={handleOnChange_bus}
                            isClearable
                        />
                       
                        {/* <label>Add Driver</label> */}
                        <label>คนขับรถ</label>
                        <Select 
                            id='selectdriver'
                            // value={ {label: isObjectNotEmpty(driver) ? driver.label : "--Select Driver--"} }
                            value={ {label: isObjectNotEmpty(driver) ? driver.label : "--เลือกคนขับรถ--"} }
                            options={driverOptions()}
                            onChange={handleOnChange_driver}
                            isClearable
                        />

                        {/* <button id='addbusschedule' className='button' type="submit">Add Bus Schedule</button> */}
                        <button id='addbusschedule' className='button' type="submit">เพิ่มรอบรถ</button>
                    </div>
                   
                </form>
            )}
        </React.Fragment>
    );
};