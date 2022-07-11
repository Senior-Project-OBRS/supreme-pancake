import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import Select from 'react-select';

import RouteCollection from '../../../../../db/RouteCollection';

import { isObjectEmpty, isObjectNotEmpty } from '../../../../../utils/objectUtils';
import Spinner from '../../../../components/Spinner';

export default SelectStation = (props) => {
    const { 
        srcStation, setSrcStation,
        dstnStation, setDstnStation 
    } = props;

    const { busStationsList, busStationsIsLoading } = useTracker(() => { 
        const handler = Meteor.subscribe('routes');
        const noDataAvailable = { busStationsList: [] };
    
        if (!handler.ready()) return { ...noDataAvailable, busStationsIsLoading: true };
        
        return { 
            busStationsList: RouteCollection.find().fetch(), 
            busStationsIsLoading: false
        };
    });

    const existedStation = () => {
        var selectedStation;
        
        if (isObjectEmpty(srcStation) && isObjectEmpty(dstnStation)) {
            return busStationsList;
        } else if (isObjectNotEmpty(srcStation)) {
            selectedStation = srcStation;

            return Array(
                busStationsList.filter(exist => exist.dstnStation.province !== selectedStation.province)[0]
            );
        } else if (isObjectNotEmpty(dstnStation)) {
            selectedStation = dstnStation;

            return Array(
                busStationsList.filter(exist => exist.srcStation.province !== selectedStation.province)[0]
            );
        }
    };

    const srcStationOptions = () => {
        const pickUp_pointList = [];

        existedStation().forEach(obj => {
            obj.srcStation.bus_stop.forEach(arr => {
                pickUp_pointList.push({
                    _id: obj._id,
                    province: obj.srcStation.province,
                    bus_stop: arr
                });
            })
        });

        return pickUp_pointList.map((obj) => ({
            label: `${obj.bus_stop}, ${obj.province}`,
            value: {
                _id: obj._id,
                province: obj.province,
                bus_stop: obj.bus_stop,
                label: `${obj.bus_stop}, ${obj.province}`
            }
        }));
    };

    const dstnStationOptions = () => {
        const dropOff_pointList = [];

        existedStation().forEach(obj => {
            obj.dstnStation.bus_stop.forEach(arr => {
                dropOff_pointList.push({
                    _id: obj._id,
                    province: obj.dstnStation.province,
                    bus_stop: arr
                });
            })
        });

        return dropOff_pointList.map((obj) => ({
            label: `${obj.bus_stop}, ${obj.province}`,
            value: {
                _id: obj._id,
                province: obj.province,
                bus_stop: obj.bus_stop,
                label: `${obj.bus_stop}, ${obj.province}`
            }
        }));
    };

    const handleOnChange_srcStation = e => {
        if (e) {
            setSrcStation(e.value);
        } else {
            setSrcStation({});
        }
    };

    const handleOnChange_dstnStation = e => {
        if (e) {
            setDstnStation(e.value);
        } else {
            setDstnStation({});
        }
    };

    return (
        <React.Fragment>
            {busStationsIsLoading ? (
                <Spinner />
            ) : (
                <div>
                    <Select
                        id = 'selectstart'
                        className='selectstart'
                        value={ {label: isObjectNotEmpty(srcStation) ? srcStation.label : "--เลือกจุดขึ้นรถ--" } }
                        options={srcStationOptions()}
                        onChange={handleOnChange_srcStation}
                        isClearable
                    />
                    <br/>

                    <Select 
                        id = 'selectstop'
                        className ='selectstop'
                        value={ {label: isObjectNotEmpty(dstnStation) ? dstnStation.label : "--เลือกจุดลงรถ--" } }
                        options={dstnStationOptions()}
                        onChange={handleOnChange_dstnStation}
                        isClearable
                    />
                </div>
            )}
        </React.Fragment>
    );
};