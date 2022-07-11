import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import Select from 'react-select';
import "./route.css";

export default AddRouteNew = ({ handleCreate_route }) => {
    const [name, setName] = useState('');

    const [srcStation, setSrcStation] = useState('');
    const [pickUp_point, setPickUp_point] = useState('');

    const [dstnStation, setDstnStation] = useState('')
    const [dropOff_point, setDropOff_point] = useState('');

    const routeDB = [
        { province: 'กรุงเทพ', bus_stop: ["หมอชิต 2", "พระราม 9", "ศรีนครินทร์", "ลาดกระบัง",] },
        { province: 'ชลบุรี', bus_stop: ["หนองรี", "บ้านบึง", "หนองชาก"] },
        // { province: 'Bangkok', bus_stop: ["Mochit", "Rama 9", "Srinakarin", "Ladkrabang",] },
        // { province: 'Chonburi', bus_stop: ["Nong Ree", "Ban Bueng", "Nong Chak"] }
    ]

    const stationOptions = () => {
        if (srcStation || dstnStation) {
            var selectedStation;
            if (!!srcStation) {
                selectedStation = srcStation;
            } else if (!!dstnStation) {
                selectedStation = dstnStation;
            }

            const existStation = routeDB.filter(exist => exist.province !== selectedStation)[0];

            return Array(existStation).map(obj => ({
                label: obj.province,
                value: obj.province
            }));
        }

        return routeDB.map(obj => ({
            label: obj.province,
            value: obj.province
        })); 
    };

    const bus_stopOptions = (station) => {
        if (!station) return;

        const updatedBus_stop = routeDB.filter(obj => obj.province === station)[0];
        return updatedBus_stop.bus_stop.map(arr => ({
            label: arr,
            value: arr
        }));
    };

    const handleOnChange_srcStation = e => {
        if (e) {
            setSrcStation(e.value);
        } else {
            setSrcStation('');
            setPickUp_point('');
        }
    };

    const handleOnChange_dstnStation = e => {
        if (e) {
            setDstnStation(e.value);
        } else {
            setDstnStation('');
            setDropOff_point('');
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        
        if (!pickUp_point) {
            // alert('Required Pick up point!');
            alert('กรุณาระบุจุดขึ้นรถ');
            return;
        } else if (!dropOff_point) {
            // alert('Required Drop off point!');
            alert('กรุณาระบุจุดลงรถ');
            return;
        }

        const newSrcStation = {
            province: srcStation,
            bus_stop: pickUp_point.map(obj => obj.value)
        };

        const newDstnStation = {
            province: dstnStation,
            bus_stop: dropOff_point.map(obj => obj.value)
        }

        Meteor.call('CreateRoute', name, newSrcStation, newDstnStation, (err, res) => {
            if (err) {
                console.error(err);
                alert(`มีเส้นทางเดินรถ ${name} อยู่ในระบบอยู่แล้ว`);

            } else if (res) {
                setName('');
                setSrcStation('');
                setPickUp_point('');
                setDstnStation('');
                setDropOff_point('');

                handleCreate_route(res, name, newSrcStation, newDstnStation);
            }
        });
    };

    return (
        <React.Fragment>
            <div className ='addroute'>
                <form className='card' onSubmit={handleSubmit}>
                    <input 
                        id='routename'
                        type="text"
                        className ='route'
                        placeholder='ex. กรุงเทพฯ - ยะลา'
                        value={name}
                        required
                        onChange={e => setName(e.target.value)}
                    />
                    <span></span>
                    <br/>
                
                    

                    <Select 
                        id='sourcestation'
                        // value={ {label: srcStation ? srcStation : "--Select Source Station--"} }
                        value={ {label: srcStation ? srcStation : "--เลือกจังหวัดต้นทาง--"} }
                        options={stationOptions()}
                        onChange={handleOnChange_srcStation}
                        isClearable
                    />
                    <br/>

                    <Select 
                        id = 'selectpickup'
                        isMulti
                        // placeholder="--Select Pick Up Point--"
                        placeholder="--เลือกจุดจอดรถ--"
                        value={pickUp_point}
                        options={bus_stopOptions(srcStation)}
                        onChange={setPickUp_point}
                        isDisabled={!srcStation}
                    />
                    <br/>
                    <Select 
                        id='selectdstn'
                        // value={ {label: dstnStation ? dstnStation : "--Select Destination Station--"} }
                        value={ {label: dstnStation ? dstnStation : "--เลือกจังหวัดปลายทาง--"} }
                        options={stationOptions()}
                        onChange={handleOnChange_dstnStation}
                        isClearable
                    />
                    <br/>
                    <Select 
                        id = 'selectdropoff'
                        isMulti
                        // placeholder="--Select Drop Off Point--"
                        placeholder="--เลือกจุดจอดรถ--"
                        value={dropOff_point}
                        options={bus_stopOptions(dstnStation)}
                        onChange={setDropOff_point}
                        isDisabled={!dstnStation}
                    />
                    <br/>
                    {/* <button id='addroute' className='button' type='submit'>Add Route</button> */}
                    <button id='addroute' className='button' type='submit'>เพิ่มเส้นทางเดินรถ</button>
                </form>
            </div>
        </React.Fragment>
    );
};