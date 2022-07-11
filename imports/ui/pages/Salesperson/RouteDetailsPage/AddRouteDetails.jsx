import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

import { isObjectNotEmpty } from '../../../../utils/objectUtils';
import Spinner from '../../../components/Spinner';
import Table from '../../../components/Table';

import './AddRouteDetails.css';

// source: https://react-table.tanstack.com/docs/examples/editable-data

export default AddRouteDetails = ({ route }) => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [originalData] = useState(data);
    const [fetchRoutes, setFetchRoutes] = useState([]);

    const [srcStation, setSrcStation] = useState('');
    const [dstnStation, setDstnStation] = useState('');

    const [fare_Fields] = useState([
        {
            route: {
                id: '',
                name: ''
            },
            journey: []
        }
    ]);

    /* Select Route */
    useEffect(() => {
        isSubscribed = true;

        if (isObjectNotEmpty(route)) {
            setFetchRoutes([route]);
        } else {
            Meteor.call('route.findAllDetails', (err, res) => {
                if (err) {
                    console.error(err);
                    alert('เกิดปัญหาในการค้นหารายละเอียดเส้นทาง กรุณาลองใหม่อีกครั้ง');
                } else if (isSubscribed && res) {
                    setFetchRoutes(res);
                }
            });
        }

        // cleanup function
        return () => {
            isSubscribed = false;
        }
    }, [route]);

    /* Editable Table */
    useEffect(() => {
        if (fare_Fields[0].journey.length) {
            setData( makeExistsData(fare_Fields[0].journey) );
        } else {
            createJourneyList();
        }
    }, [ fare_Fields[0].route.id ]);

    const routeOptions = () => {
        if (!fetchRoutes.length) return;

        return fetchRoutes.map(obj => ({
            label: obj.name,
            value: {
                _id: obj._id,
                name: obj.name,
                srcStation: obj.srcStation,
                dstnStation: obj.dstnStation,
                details: obj.details !== undefined ? obj.details : []
            }
        }));
    };
    const EditableCell = ({
        value: initialValue,
        row: { index },
        column: { id },
        updateMyData,
    }) => {
        const [value, setValue] = useState(initialValue);

        const onChange = e => {
            setValue(e.target.value);
        };

        const onBlur = () => {
            updateMyData(index, id, value);
        };

        useEffect(() => {
            setValue(initialValue);
        }, [initialValue]);

        return <input value={value} onChange={onChange} onBlur={onBlur} />
    };

    const defaultColumn = {
        Cell: EditableCell,
    }

    const createJourneyList = () => {
        if (!srcStation && !dstnStation) return;

        srcStation.bus_stop.forEach(pickUp_point => {
            dstnStation.bus_stop.forEach(dropOff_point => {
                fare_Fields[0].journey.push( `${pickUp_point} - ${dropOff_point}` );
            })
        });

        setData( makeNewData(fare_Fields[0].journey) );
    };

    const makeExistsData = (info) => {
        return info.map(obj => ({
            journey: obj.journey,
            fare: obj.fare,
            travelTime: obj.travelTime
        }));
    };

    const makeNewData = (info) => {
        return info.map(str => ({
            journey: str,
            fare: '0',
            travelTime: '00:00'
        }));
    };

    const columns = React.useMemo(() => [
        {
            // Header: 'Journey Name',
            Header: 'ต้นทาง - ปลายทาง',
            accessor: 'journey',  
            
        },
        {
            // Header: 'Bus Fare (Baht)',
            Header: 'อัตราค่าโดยสาร (บาท)',
            accessor: 'fare',
            Cell:EditableCell
        },
        {
            // Header: 'Travel Time (HH:MM)',
            Header: 'ระยะเวลาเดินทาง (ชั่วโมง:นาที)',
            accessor: 'travelTime',
            Cell: EditableCell,

        }
    ], []);

   

    const updateMyData = (rowIndex, columnId, value) => {
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    };
                }
                return row;
            })
        );
    };

    const resetData = () => {
        // setData(originalData);
        console.log('reset')
    };

    const handleSelect = e => {
        if (e.value["details"] !== []) {
            fare_Fields[0].journey = e.value["details"];
        }
        
        fare_Fields[0].route.id = e.value._id;
        fare_Fields[0].route.name = e.value.name;

        setSrcStation(e.value.srcStation);
        setDstnStation(e.value.dstnStation);
    }; 

    const customStyles = {
        container: provided => ({
          ...provided,
          width: 200,       
        })
    };
      
    const handleSubmit = () => {
        const routeId = fare_Fields[0].route.id;

        Meteor.call('route.addDetails', routeId, data, (error, result) => {
            if (error) {
                console.error(error);
                alert('เพิ่มรายละเอียดเส้นทางไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
            } else if (result) {
                navigate('/agent/route');
            }
        });
    };

    return (
        <React.Fragment>
            {!fetchRoutes.length ? (
                <Spinner />
            ) : (
                <div>
                   <br/>
                    <Select 
                        className='selectpos'
                        styles ={customStyles}
                        // value={ {label: fare_Fields[0].route.name ? fare_Fields[0].route.name : '--Select Route--'} }
                        value={ {label: fare_Fields[0].route.name ? fare_Fields[0].route.name : '--เลือกเส้นทาง--'} }
                        options={routeOptions()}
                        onChange={e => handleSelect(e)}
                    />
                 

                    {fare_Fields[0].route.id && 
                        <div>
                            <div className ='saveroute'>
                            <button className = 'button' onClick={() => handleSubmit()}>บันทึก</button>
                            </div>
                            <div className = 'tablepos'>
                            <Table 
                                
                                columns={columns} 
                                data={data}
                                // defaultColumn={defaultColumn} 
                                updateMyData={updateMyData}
                                
                            />
                            </div>
                            
                            {/* Function in <button> doesn't work !? */}
                            {/* <button onClick={() => resetData()}>
                                บันทึก
                            </button> */}
                        </div>
                    }
                </div>
            )}
        </React.Fragment>
    );
};