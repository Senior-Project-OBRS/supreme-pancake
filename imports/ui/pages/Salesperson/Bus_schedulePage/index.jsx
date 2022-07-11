import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';


import AddBus_schedule from './AddBus_schedule';
import "./bus_schedule.css";

import Table from '../../../components/Table';
import Spinner from '../../../components/Spinner';

export default Bus_schedulePage = () => {
    // const [bus_scheduleList, setBus_scheduleList] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        let isSubscribed = true;

        Meteor.call('bus_schedule.findAll', (error, result) => {
            if (error) {
                console.error(error);
                alert('ไม่สามารถเรียกดูตารางเดินรถได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
            } else if (isSubscribed) {
                if (!result.length) {
                    alert('ยังไม่มีข้อมูลตารางเดินรถ');
                } else {
                    setData( makeData(result) ); 
                }
            }
        });

        // cleanup function
        return () => {
            isSubscribed = false;
        };
    }, []);

    const handleCreate = (bus_scheduleId, route, deptDate, deptTime, bus, driver) => {
        const dataCopy = [...data];
        dataCopy.push({
            _id: bus_scheduleId,
            datetime: `${deptDate} ${deptTime}`,
            plate_number: bus.plate_number,
            driverName: `${driver.firstName} ${driver.lastName}`,
            total_seating: bus.total_seating,
            routeName: route.name,
        });
        
        setData(dataCopy);
    };

    const handleDelete = (props) => {
        if (window.confirm('ต้องการลบตารางเดินรถใช่หรือไม่')) { 
            const bus_scheduleId = props.row.original._id;
            const datetime = props.row.original.datetime;

            Meteor.call('bus_schedule.remove', bus_scheduleId, (err, res) => {
                if (err) {
                    console.error(err);
                    alert('ไม่สามารถลบรอบรถได้ กรุณาลองใหม่อีกครั้ง');
                } else if (res) {
                    const dataCopy = [...data];
                    dataCopy.splice(props.row.index, 1);
                    setData(dataCopy);
                    alert(`ลบรอบรถ ${datetime} สำเร็จ`);
                } 
            });
        }
    };

    const makeData = (info) => {
        return info.map(obj => ({
            _id: obj._id,
            datetime: `${obj.deptDate} ${obj.deptTime}`,
            plate_number: obj.bus.plate_number,
            driverName: `${obj.driver.profile.firstName} ${obj.driver.profile.lastName}`,
            total_seating: obj.bus.total_seating,
            routeName: obj.route.name,  
        }));
    };

    const columns = React.useMemo(() => [    
        {
            Header: 'เส้นทาง',
            accessor: 'routeName',
        },
        {
            // Header: 'Datetime',
            Header: 'วัน-เวลา',
            accessor: 'datetime',
        },
        {
            Header: 'คนขับ',
            accessor: 'driverName',
        },
        {
            // Header: 'Bus Number Plate',
            Header: 'ทะเบียนรถ',
            accessor: 'plate_number',
        },
        {
            // Header: 'Bus Seating Capacity',
            Header: 'ความจุ (ที่นั่ง)',
            accessor: 'total_seating',
        },
       
        {
            Header: '',
            id: '_id',
            accessor: '_id',

            Cell: (tableProps) => (
                <button id = { 'delbusschedule' + tableProps.row.id } className ='button' onClick={() => handleDelete(tableProps)}>
                    ลบ
                </button>
            )
        },
    ], [data]);
    
    return (
        <React.Fragment>
            <div className = 'addsc'>
                <h2>ตารางเดินรถ</h2>
                <AddBus_schedule handleCreate={handleCreate} />
                
                <div>
                    {!data.length ? (
                        <Spinner />
                    ) : (
                        <React.Fragment>
                            {/* 
                                ใช้ expanded table เพื่อแสดง Route name และ Date บนหัว table (ลดความซ้ำซ้อนของ route, date เมื่อเป็น field ใน table)
                                https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7/examples/expanding?file=/src/App.js
                            */}
                            <span>
                               
                            </span>

                                <div className='busscheduletablepos'>
                                <Table columns={columns} data={data} sortItemBy='name' />
                                </div>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};