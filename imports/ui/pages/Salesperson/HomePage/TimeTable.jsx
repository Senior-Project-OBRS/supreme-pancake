import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import React, { useEffect, useState } from 'react';

import Table from '../../../components/Table';
import USER_role from '../../../../utils/enums/USER_role';

export default TimeTable = ({ timetableId: bus_scheduleId }) => {
    const userId = Meteor.userId();
    const get_userRole = useTracker(() => Roles.getRolesForUser(userId));
    const isDriverRole = Roles.userIsInRole(userId, USER_role.Driver);

    const [timetable_data, setTimetable_data] = useState('');
    const [timetable_details, setTimeTable_details] = useState({
        routeName: '',
        deptDate: '',
        deptTime: '',
        occupied_seat: '',
        total_seating: ''
    });

    useEffect(() => {
        let isSubscribed = true;

        Meteor.call('booking.findBookingByBus_scheduleId', bus_scheduleId, (err, res) => {
            if (err) {
                console.error(err); 
                alert('เกิดปัญหาในการค้นหารอบรถ กรุณาลองใหม่อีกครั้ง');
            } else if (isSubscribed) {
                const result = [];

                if (res.length) {
                    console.log(res)
                    const bus_schedule = res[0].bus_schedule;
                    
                    setTimeTable_details({
                        routeName: bus_schedule.route.name,
                        deptDate: bus_schedule.deptDate,
                        deptTime: bus_schedule.deptTime,
                        occupied_seat: bus_schedule.occupied_seat,
                        total_seating: bus_schedule.bus.total_seating
                    });

                    res.forEach(booking => {
                        booking.passengersInfo.forEach(pax => {
                            pax.bookingId = booking._id;
                            result.push(pax);
                        });
                    });
                }
                
                setTimetable_data(makeTimetable_data(result));
            }
        });

        // cleanup function
        return () => {
            isSubscribed = false;
        }
    }, [bus_scheduleId]);

    const handleDelete = (props) => {
        if (window.confirm('ต้องการลบ Booking ใช่หรือไม่')) {
            const bookingId_target = props.row.original.bookingId;

            Meteor.call('booking.remove', bookingId_target, (err, res) => {
                if (err) {
                    console.error(err);
                    alert('ไม่สามารถลบ Booking ได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
                } else if (res) {
                    // (1) update timeTable_data
                    const result = timetable_data.filter(pax => pax.bookingId != bookingId_target);

                    // update No.
                    result.forEach((pax, idx) => {
                        result[idx].no = idx + 1;
                    });

                    setTimetable_data(result);

                    // (2) update timeTable_details
                    setTimeTable_details({
                        ...timetable_details, 
                        occupied_seat: result.length
                    });
                }
            });
        }
    };

    const makeTimetable_data = (passengerList) => {
        let result = [];
        passengerList.forEach((pax, idx) => {
            let obj = {};

            obj.bookingId = pax.bookingId;
            obj.no = idx + 1;
            obj.titleName = pax.titleName;
            obj.firstName = pax.firstName;
            obj.lastName = pax.lastName;
            obj.status = pax.status;
            

            result.push(obj);
        });

        return result;
    };

    const timetable_columns = React.useMemo(() => [
        {
            Header: 'ลำดับที่',
            accessor: 'no'
        },
        {
            Header: 'คำนำหน้า',
            accessor: 'titleName'
        },
        {
            Header: 'ชื่อ',
            accessor: 'firstName'
        },
        {
            Header: 'นามสกุล',
            accessor: 'lastName'
        },
        {
            Header: 'สถานะ',
            accessor: 'status'
        },
        {
            Header: '',
            id: 'bookingId',
            accessor: 'bookingId',

            Cell: (tableProps) => {
                // isSubscribed
                if (get_userRole.length) {
                    return (
                        <React.Fragment>
                            {!isDriverRole && 
                                <div className ='addbus'>
                                    <button 
                                        id={'delbutton' + tableProps.row.id} 
                                        className='button' 
                                        onClick={() => handleDelete(tableProps)}
                                    >
                                        ลบ
                                    </button>
                                </div>
                            }
                        </React.Fragment>                        
                    );
                }
            }
        },
    ], [timetable_data]);

    return (
        <React.Fragment>
            <div className='homepage'>
                {!timetable_data.length ? (
                    <p>ยังไม่มีผู้โดยสารในรอบนี้</p>
                ) : (
                    <React.Fragment>
                        <div>
                            <p>{timetable_details.routeName}</p>
                            <p>
                                <span>{timetable_details.deptDate}</span> &ensp;
                                <span>{timetable_details.deptTime}</span>
                            </p>
                        </div>

                        <div>
                            {/* <span>Available: {timetable_details.total_seating - timetable_details.occupied_seat}</span> &ensp;
                            <span>Occupied: {timetable_details.occupied_seat}</span> &ensp;
                            <span>Total: {timetable_details.total_seating}</span> */}
                            <span>ว่าง : {timetable_details.total_seating - timetable_details.occupied_seat}</span> &ensp;
                            <span>จอง : {timetable_details.occupied_seat}</span> &ensp;
                            <span>ทั้งหมด : {timetable_details.total_seating}</span>
                        </div>

                        <Table columns={timetable_columns} data={timetable_data} />
                    </React.Fragment>      
                )}
            </div>
        </React.Fragment>
    );
};