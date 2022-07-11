import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import moment from 'moment';

import Table from '../../../../components/Table';

import './step2.css'

// use: https://www.npmjs.com/package/react-datetime

export default ShowSearchResults = () => {
    const [data, setData] = useState([]);
    
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const deptStation = searchParams.get('deptStation');
    const arrStation = searchParams.get('arrStation');
    const deptDate = searchParams.get('deptDate');
    const NoPassengers = searchParams.get('NoPassengers');

    if (!deptStation || !arrStation || !deptDate || !NoPassengers) {
        alert('กรุณาระบุข้อมูล "สถานีต้นทาง-ปลายทาง-วันที่จะเดินทาง-จำนวนผู้โดยสาร"');
        return <Navigate to='/' />
    }

    useEffect(() => {
        let isSubscribed = true;

        Meteor.call('bus_schedule.find', deptStation, arrStation, deptDate, NoPassengers, (err, res) => {
            if (err) {
                console.error(err);
                alert('เกิดปัญหาในการค้นหารอบรถ กรุณาลองใหม่อีกครั้ง');
            } else if (isSubscribed) {
                const result = [];
                
                if (res.length) {
                    res.forEach(obj => {
                        if ("route" in obj) {
                            const passengers = parseInt(NoPassengers);
                            const occupied_seat = obj.occupied_seat;
                            const total_seating = obj.bus.total_seating;
    
                            if (passengers <= total_seating - occupied_seat) result.push(obj);
                        }
                    });
                }

                setData( makeData(result) ); 
            }     
        });

        // cleanup function
        return () => {
            isSubscribed = false;
        };
    });

    const handleSelect = (props) => {
        const values = props.row.values;
        
        navigate('/bus_schedule/confirm', {
            state: {
                bus_scheduleId: values._id,
                deptStation: deptStation,
                arrStation: arrStation,
                deptDate: deptDate,
                deptTime: values.deptTime,
                arrTime: values.arrTime,
                travelTime: values.travelTime,
                NoPassengers: NoPassengers,
                total_fare: values.fare * NoPassengers
            }
        });
    };

    const makeData = (info) => {
        if (!info.length) {
            alert('ไม่มีรอบรถที่ต้องการ');
            navigate('/');
        } else {
            let result = [];

            info.forEach(item => {
                let obj = {};
                const journey = item.route.details.find(o => o.journey === `${deptStation} - ${arrStation}`);
               
                const travelTime = journey.travelTime.split(":");
                const hours = parseInt(travelTime[0]);
                const minutes = parseInt(travelTime[1]);

                obj._id = item._id;
                obj.deptTime = item.deptTime;
                obj.travelTime = journey.travelTime;
                obj.arrTime = moment(item.deptTime, "HH:mm").add(hours, 'hours').add(minutes, 'minutes').format("HH:mm");
                obj.fare = journey.fare;
                              
                result.push(obj);
            });

            return result;
        }
    };

    const columns = React.useMemo(() => [
        {
            // Header: 'Departure Time',
            Header: 'เวลาออก (น.)',
            accessor: 'deptTime',
            sortItemBy: true
        },
        {
            // Header: 'Travel Time',
            Header: 'ระยะเวลาเดินทาง (ชั่วโมง:นาที)',
            accessor: 'travelTime',
        },
        {
            // Header: 'Arrival Time',
            Header: 'เวลาถึง (น.)',
            accessor: 'arrTime',
        },
        {
            // Header: 'Fare',
            Header: 'อัตราค่าโดยสาร (บาท/คน)',
            accessor: 'fare',
        },
        {
            Header: '',
            id: '_id',
            accessor: '_id',

            Cell: (tableProps) => (
                <div className ='book'>
                    <button id = 'bookbutton' className='button' onClick={() => handleSelect(tableProps)}>
                        จอง
                    </button>
                </div>
            )
        }
    ]);

    return (
        <React.Fragment>
            <div className ='headpage2'>
                <h2>ตารางการเดินรถ</h2>
            </div>

            <div className='book'>
                <form className='card'>
                    <div className='display'>
                        <div>
                            {deptStation} -&gt; {arrStation}
                        </div>
                        <div>
                            {deptDate} | {NoPassengers} passengers
                        </div>
                    </div>
                        <div class ='step2table'>
                    <Table columns={columns} data={data} sortItemBy={data} />    
                    </div>  
                </form>    
            </div>
        </React.Fragment>
    );
};