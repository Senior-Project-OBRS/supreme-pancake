import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import './step2cb.css'
import Table from '../../../../components/Table';
import moment from 'moment';


export default DisplaySearchResults = () => {
    const [data, setData] = useState([]);

    const { bookingId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const deptStation = searchParams.get('deptStation');
    const arrStation = searchParams.get('arrStation');
    const deptDate = searchParams.get('deptDate');
    const NoPassengers = searchParams.get('NoPassengers');
    const oldDate = searchParams.get('oldDate');
    const oldTime = searchParams.get('oldTime');
    
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

        navigate(`/changeBus_schedule/${bookingId}/confirm`, {
            state: {
                bus_scheduleId: values._id,
                deptStation: deptStation,
                arrStation: arrStation,
                deptDate: deptDate,
                deptTime: values.deptTime,
                arrTime: values.arrTime,
                travelTime: values.travelTime,
                NoPassengers: NoPassengers,
                total_fare: values.fare * NoPassengers,
                oldDate,
                oldTime,    
            }
        });
    };

    const makeData = (info) => {
        if (!info.length) {
            alert('ไม่มีรอบรถที่ต้องการ')
            navigate(`/changeBus_schedule/${bookingId}`)
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
            Header: 'อัตราค่าโดยสาร (บาท)',
            accessor: 'fare',
        },
        {
            Header: '',
            id: '_id',
            accessor: '_id',
            
            Cell: (tableProps) => (
                <div className ='changeb2'>
                <button id = 'changedatebut' className='button' onClick={() => handleSelect(tableProps)}>
                    เลือก
                </button>
                </div>
            )
        }
    ]);

    return (
        <React.Fragment>
            <div className ='changeb2'>
                <div className='card'>
                <p>เส้นทาง : {deptStation} -&gt; {arrStation}</p>
                <p>วันและเวลาเดินทาง : {deptDate} | {NoPassengers} passengers</p>
                </div>

            </div>
            <br/>

            <Table columns={columns} data={data} /*sortItemBy={}*/ />          
        </React.Fragment>
    );
};