import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';

import AddRoute from './AddRoute';

import Table from '../../../components/Table';
import Spinner from '../../../components/Spinner';

export default RoutePage = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let isApiSubscribed = true;

        Meteor.call('route.findAll', (error, result) => {
            if (error) {
                console.error(error);
                alert('ไม่สามารถเรียกดูรายการเส้นทางได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
            } else if (isApiSubscribed) {
                if (!result) {
                    alert('ยังไม่มีข้อมูลเส้นทางเดินรถ');
                } else {
                    setData( makeData(result) );
                }             
            }
        });

        // cleanup function
        return () => {
            isApiSubscribed = false;
        };
    }, []);

    const handleCreate_route = (routeId, routeName, newSrcStation, newDstnStation) => {
        const dataCopy = [...data];
        dataCopy.push({
            _id : routeId,
            name: routeName,
            srcStation: newSrcStation.province,
            dstnStation: newDstnStation.province,
            bus_start: newSrcStation.bus_stop,
            bus_stop: newDstnStation.bus_stop
        });

        setData(dataCopy);
    };

    const handleManage_route = (props) => {
        const routeId = props.row.original._id;

        navigate('/agent/route_details', {
            state: {
                routeId
            }
        });
    };

    const handleDelete_route = (props) => {
        if (window.confirm('ต้องการลบเส้นทางเดินรถใช่หรือไม่')) { 
            const dataCopy = [...data];
            dataCopy.splice(props.row.index, 1);
            setData(dataCopy);

            const routeId = props.row.original._id;
            const routeName = props.row.original.name;
        
            Meteor.call('route.remove', routeId, (err, res) => {
                if (err) {
                    console.error(err);
                    alert('ไม่สามารถลบเส้นทางเดินรถได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
                } else if (res) {
                    alert(`ลบข้อมูลเส้นทาง ${routeName} สำเร็จ`);
                }
            });
        }
    }

    const makeData = (info) => {
        return info.map(obj => ({
            _id : obj._id,
            name: obj.name,
            srcStation:  obj.srcStation.province,
            dstnStation:  obj.dstnStation.province,
            bus_start: ' ' +obj.srcStation.bus_stop,
            bus_stop: ' ' +obj.dstnStation.bus_stop
        }));
    };

    const columns = React.useMemo(() => [       
        {
            // Header: 'name',
            Header: 'เส้นทาง',
            accessor: 'name',
        },
        {
            // Header: 'srcStation',
            Header: 'จังหวัดต้นทาง',
            accessor: 'srcStation',
        },
         {
            // Header: 'bus start',
            Header: 'จุดขึ้นรถ',
            accessor: 'bus_start',
        },

        {
            // Header: 'dstnStation',
            Header: 'จังหวัดปลายทาง',
            accessor: 'dstnStation',
        },
        {
            // Header: 'bus stop',
            Header: 'จุดจอดรถ',
            accessor: 'bus_stop',
        },
       
        {
            Header: '',
            id: '_id',
            accessor: '_id',

            Cell: (tableProps) => (
                <DropdownButton title ='...' id = {'opendrop'+ tableProps.row.id} className="bi bi-three-dots-vertical">
                    <Dropdown.Item onClick={() => handleManage_route(tableProps)}>
                        จัดการจุดจอดในเส้นทาง      
                    </Dropdown.Item>

                    <Dropdown.Item id = {'delroute'+ tableProps.row.id}onClick={() => handleDelete_route(tableProps)}>
                        ลบ
                    </Dropdown.Item>
                </DropdownButton>
            )
        },
    ], [data]);
    
    return (
        <React.Fragment>
            <div className ='addroute'>
            <h2>&emsp;เส้นทางเดินรถ
        
            </h2>
        
                <AddRoute handleCreate_route={handleCreate_route} />
                
                <div>
                    {!data.length ? (
                        <Spinner />
                    ) : (
                        <React.Fragment>
                            {/* 
                                ใช้ expanded table เพื่อแสดง Route name และ Date บนหัว table (ลดความซ้ำซ้อนของ route, date เมื่อเป็น field ใน table)
                                https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7/examples/expanding?file=/src/App.js
                            */}

                           <div className = 'routetablepos'>
                                <Table columns={columns} data={data} sortItemBy='name' />
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};