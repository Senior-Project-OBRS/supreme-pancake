import React, { useState } from 'react';
import { Dropdown } from "react-bootstrap"

/* source: 
    https://react-bootstrap.github.io/components/dropdowns/
    https://codesandbox.io/s/infallible-lake-d0tfgi?file=/src/App.js
*/

export default ChoosePassengers = ({ NoPassengers, setNoPassengers }) => {
    const handlePax_increase = () => {
        if (NoPassengers < 4) setNoPassengers(NoPassengers + 1);
    };
    
    const handlePax_decrease = () => {
        if (NoPassengers > 1) setNoPassengers(NoPassengers - 1);
    };

    return (
        <React.Fragment>   
            <Dropdown autoClose="outside">
                <Dropdown.Toggle id = 'dropdown_pass' className="btn btn-danger dropdown-toggle">
                    {`จำนวนผู้โดยสาร ${NoPassengers} คน`}
                </Dropdown.Toggle>
               
                <Dropdown.Menu >
                    <Dropdown.Item>
                        ผู้ใหญ่ (อายุ 12 ปีขึ้นไป)

                        <button id = 'dec_pass' onClick={() => handlePax_decrease()}>-</button>
                            {NoPassengers}
                        <button id = 'inc_pass' onClick={() => handlePax_increase()}>+</button>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>         
        </React.Fragment>
    );
};