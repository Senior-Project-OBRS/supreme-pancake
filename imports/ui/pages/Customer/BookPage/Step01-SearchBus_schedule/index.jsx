import React, { useState } from 'react';

import SelectStation from './SelectStation';
import ChoosePassengers from './ChoosePassengers';
import "./step1.css";

import { isObjectEmpty } from '../../../../../utils/objectUtils';
import useNavigateSearch from '../../../../../hooks/useNavigateSearch';

export default SearchBus_schedule = () => {
    const [srcStation, setSrcStation] = useState({});
    const [dstnStation, setDstnStation] = useState({});
    const [deptDate, setDeptDate] = useState('');   // 2022-04-26
    const [NoPassengers, setNoPassengers] = useState(1);     // Passenger

    const navigateSearch = useNavigateSearch();
    
    const handleSubmit = e => {
        e.preventDefault();

        if (isObjectEmpty(srcStation)) {
            // alert('Required Source Station !');
            alert('กรุณาระบุสถานีต้นทาง');
        } else if (isObjectEmpty(dstnStation)) {
            // alert('Required Destination Station !');
            alert('กรุณาระบุสถานีปลายทาง');
        } else if (!deptDate) {
            // alert('Required Departure Date !');
            alert('กรุณาระบุวันที่เดินทาง');
        } else {
            navigateSearch('/bus_schedule/search', {
                deptStation: srcStation.bus_stop,
                arrStation: dstnStation.bus_stop,
                deptDate: deptDate,
                NoPassengers: NoPassengers
            });
        }
    };

    return (
        <React.Fragment>
            <div className ='find'>
            <div className="box" >    
                <h1>ค้นหารถโดยสาร</h1>
                
                <form>
                    <SelectStation
                        srcStation={srcStation}
                        setSrcStation={setSrcStation}
                        dstnStation={dstnStation}
                        setDstnStation={setDstnStation}
                    />
                    <br/>
                    <input 
                        id = 'datesearch'
                        type="date"
                    
                        value={deptDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={e => setDeptDate(e.target.value)}
                    />
                    <br/><br/>
                    <ChoosePassengers
                        NoPassengers={NoPassengers}
                        setNoPassengers={setNoPassengers}
                    />
                    <br/>
                  
                    <button id = 'searchbutton' className = 'button' type="submit" onClick={e => handleSubmit(e)}>
                        ค้นหา
                    </button>      
              
                </form>               
            </div>
            </div>
        </React.Fragment>
    );
};