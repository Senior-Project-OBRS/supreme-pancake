import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import './homepage.css'
import TimeTable from './TimeTable';
import Table from '../../../components/Table';
import Spinner from '../../../components/Spinner';
import { isObjectEmpty } from '../../../../utils/objectUtils';

export default HomePage = () => {
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [allTimetables_data, setAllTimetables_data] = useState([]);
    const [bus_scheduleId, setBus_scheduleId] = useState('');
    
    useEffect(() => {
        let isSubscribed = true;

        Meteor.call('bus_schedule.findByDate', date, (error, result) => {
            if (error) {
                console.error(error);
                alert('ไม่สามารถเรียกดูตารางเดินรถได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
            } else if (isSubscribed && result) {
                setAllTimetables_data(makeAllTimetables_data(result));
            }
        });

        // cleanup function
        return () => {
            isSubscribed = false;
        }
    }, [date]);

    const handle_selectTimetable = (props) => {
        const values = props.row.values;
        setBus_scheduleId(values._id);
    };

    const makeAllTimetables_data = (info) => {
        let result = [];
        info.forEach(item => {
            let obj = {};

            const driver = item.driver.profile;
            obj._id = item._id;
            obj.deptTime = item.deptTime;
            obj.routeName = item.route.name;
            obj.driver = driver.firstName + driver.lastName;

            result.push(obj);
        });

        return result;
    };

    const allTimetables_columns = React.useMemo(() => [
        {
            Header: 'เส้นทาง',
            accessor: 'routeName'
        },
        {
            Header: 'เวลาออก (น.)',
            accessor: 'deptTime'
        },
        {
            Header: 'คนขับ',
            accessor: 'driver'
        },
        {
            Header: '',
            id: '_id',
            accessor: '_id',

            Cell: (tableProps) => (
                <div className ='homepage'>
                    <button className ='button' onClick={() => handle_selectTimetable(tableProps)}>
                        เลือก
                    </button>
                </div>
            )
        }
    ], [allTimetables_data]);

    const handle_selectDate = e => {
        setDate(e.target.value);
        setBus_scheduleId('');
    };

    return (
        <React.Fragment>
            <div className ='homepage'>
                <a href = '/agent/check-in'>
                    <img position = 'center' src={"../../../scan.jpg"}  className ='imgscan'/>
                </a>

                <div className ='card'>
                    <p>ตรวจสอบรอบรถ</p>
                    <br />
                    <input 
                        min={new Date().toISOString().split('T')[0]}
                        type="date"
                        value={date}
                        onChange={e => handle_selectDate(e)}
                    />

                    {!allTimetables_data.length ? (
                        <p>ไม่มีรอบรถ</p>
                    ) : (
                        <Table columns={allTimetables_columns} data={allTimetables_data} />
                    )}

                    {!bus_scheduleId ? (
                        <p>ยังไม่ได้เลือกรอบรถ</p>
                    ) : (
                        <div class ='homepagetable'>
                        <TimeTable timetableId={bus_scheduleId} />
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};