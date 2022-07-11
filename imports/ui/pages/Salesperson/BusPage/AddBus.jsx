import React, { useState } from 'react';
import Select from 'react-select';
import "./bus.css";
// source: https://codesandbox.io/s/txzui?file=/src/App.js:1623-1631

export default AddBus = ({ handleCreate_bus }) => {
  const [plate_number, setPlate_number] = useState('');
  const [type, setType] = useState('');
  const [total_seating, settotalSeat] = useState('');
  
  const plateValidator = /^[ก-ฮ]{1,3} [0-9]{1,4}$/;

  const busType_Capacity = [
    { type: 'Van', total_seating: [12, 13, 14] },
    { type: 'Mini Bus', total_seating: [20, 21] },
  ];


 
  const busTypeOptions = () => {
    return busType_Capacity.map(obj => ({
      label: obj.type,
      value: obj.type,
    }));
  };

  const busCapacityOptions = () => {
    if (!type) return;

    const updatedBusType = busType_Capacity.filter(obj => obj.type === type)[0];
    
    return updatedBusType.total_seating.map(arr => ({
      label: arr,
      value: arr
    }));
  };

  const handleOnChange_busType = e => {
    if (e) {
      setType(e.value);
    } else {
      setType('');
      settotalSeat('');
    }
  };

  const handleOnChange_busCapacity = e => {
    if (e) {
      settotalSeat(e.value);
    } else {
      settotalSeat('');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!plateValidator.test(plate_number)) {
      // alert("Invalid Plate No");
      alert("ป้ายทะเบียนไม่ถูกต้อง");
      return;
    }
    if (!type) {
      // alert('Required Bus Type!');
      alert('กรุณาระบุประเภทรถโดยสาร');
      return;
    } else if (!total_seating) {
      // alert('Required Capacity!');
      alert('กรุณาระบุความจุที่นั่ง')
      return;
    } else {
      Meteor.call('bus.insert', plate_number, type, total_seating, (error, result) => {
        if (error) {
          console.log(error);
          // alert('Duplicate Plate Number');
          alert(`มีทะเบียนรถ ${plate_number} อยู่ในระบบอยู่แล้ว`);
        } else if (result) {
          setPlate_number('');
          setType('');
          settotalSeat('');
  
          handleCreate_bus(result, plate_number, type, total_seating);
        }
      });
    }
  };

  return (
    <React.Fragment>
      <div className ='addbus'>
      <form className ='card'onSubmit={handleSubmit}>
      {/* <label htmlFor='Plate No'>Plate No</label> */}
      <label htmlFor='Plate No'>หมายเลขทะเบียน</label>
        <input
        // validate
          id = 'Plate No'
          className = 'plate'
          pattern ='^[ก-ฮ]{1,3} [0-9]{1,4}$'
          type="text"
          placeholder="ex. กข 1234"
          value={plate_number}
          required
          onChange={e => setPlate_number(e.target.value)}
        /> 
        <span></span>
        {/* <label htmlFor='Bus Type'>Bus Type</label> */}
        <label htmlFor='Bus Type'>ประเภทรถโดยสาร</label>
        <Select 
          id='Bus Type'
          // value={ {label: type ? type : "--Select Bus Type--"} }
          value={ {label: type ? type : "--เลือกประเภทรถโดยสาร--"} }
          options={busTypeOptions()}
          onChange={handleOnChange_busType}
          isClearable
        />
        {/* <label htmlFor='Total Seating'>Total Seating</label> */}
        <label htmlFor='Total Seating'>ความจุที่นั่ง</label>
        <Select
          id='Total Seating'
          // value={ {label: total_seating ? total_seating : "--Select Total Seating--"} }
          value={ {label: total_seating ? total_seating : "--เลือกความจุที่นั่ง--"} }
          options={busCapacityOptions()}
          onChange={handleOnChange_busCapacity}
          isDisabled={!type}
          isClearable
        />
        
        {/* <button id='addbus' onClick = {handleSubmit} className='button' type="submit">Add Bus</button> */}
        <button id='addbus' onClick = {handleSubmit} className='button' type="submit">เพิ่มรถโดยสาร</button>
      </form>
      </div>
    </React.Fragment>
  );
};