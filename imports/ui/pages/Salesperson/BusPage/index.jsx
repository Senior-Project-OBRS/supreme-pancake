import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';

import AddBus from './AddBus';

import Table from '../../../components/Table';
import Spinner from '../../../components/Spinner';

export default BusPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let isApiSubscribed = true;
        Meteor.call('bus.findAll', (error, result) => {
            if (isApiSubscribed) {
                if (!result.length) {
                    alert('ยังไม่มีข้อมูลรถโดยสาร');
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
    
    const handleCreate_bus = (busId, plate_number, type, total_seating) => {
        const dataCopy = [...data];
        dataCopy.push({
            _id: busId,
            plate_number: plate_number,
            type: type,
            total_seating: total_seating, 
        });

        setData(dataCopy);
    };

    const handleDelete = (props) => {
        if (window.confirm('ต้องการลบรถโดยสารใช่หรือไม่')) { 
            const dataCopy = [...data];
            dataCopy.splice(props.row.index, 1);
            setData(dataCopy);
            
            const id = props.row.original._id;
            const plateNo = props.row.original.plate_number;
            
            Meteor.call('bus.remove', id, (err, res) => {
                if (err) {
                    console.error(err);
                    alert('ไม่สามารถลบรถโดยสารได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
                } else if (res) {
                    alert(`ลบข้อมูลรถโดยสาร ${plateNo} สำเร็จ`);
                }
            });
        }
        
    }

    const makeData = (info) => {
        return info.map(obj => ({
            _id: obj._id,
            plate_number: obj.plate_number,
            type: obj.type,
            total_seating: obj.total_seating,        
        }));
    };

    const columns = React.useMemo(() => [        
        {
            // Header: 'plate_number',
            Header: 'ป้ายทะเบียน',
            accessor: 'plate_number',
        },
        {
            // Header: 'type',
            Header: 'ประเภท',
            accessor: 'type',
        },
        {
            // Header: 'total_seating',
            Header: 'ความจุ (ที่นั่ง)',
            accessor: 'total_seating',
        },
       
        {
            Header: '',
            id: '_id',
            accessor: '_id',

            Cell: (tableProps) => (
                <div className ='addbus'>
                    <button id={'delbutton' + tableProps.row.id} className='button' onClick={() => handleDelete(tableProps)}>
                        ลบ
                    </button>
                </div>
            )
        },
    ], [data]);
    
    return (
        <React.Fragment>
            <div className ='addbus'>
                <h2> &nbsp; &nbsp;รถโดยสาร</h2>
           
                <AddBus
                    handleCreate_bus={handleCreate_bus}
                />
                
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
                           <div className ='bustablepos'>
                           
                              <Table columns={columns} data={data} sortItemBy='name' />
                              </div>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};