import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';

import React, { useEffect, useState, useRef } from "react";
import Select from 'react-select';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './admin.css';


import ROLES from '../../../utils/enums/USER_role';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';

export default Admin = () => {
    const [data, setData] = useState([]);

    const { userList, loading } = useTracker(() => {
        setData([]);

        const handler = Meteor.subscribe('usersData');
        const noDataAvailable = { userList: [] };

        if (!handler.ready()) return { ...noDataAvailable, loading: true };
        
        return {
            userList: Meteor.users.find().fetch(),
            loading: false
        }
    }, []);
    
    useEffect(() => {
        let isSubscribed = true;
        if (userList.length && isSubscribed) setData(makeData([...userList]));

        // cleanup function
        return () => {
            isSubscribed = false;
        };
    }, [userList]);

    const rolesOptions = () => {
        const rolesArr = Object.values(ROLES);

        return rolesArr.map(item => ({
            label: item,
            value: item
        }));
    };

    const handleChange_role = (e, props) => {
        const values = props.row.original;
        const username = values.username;

        if (window.confirm(`ยืนยันเปลี่ยนบทบาทผู้ใช้งาน ${username} ใช่หรือไม่`)) {
            const userId = values._id;
            const newRole = e.value;

            Meteor.call('users.updateRoles', userId, newRole, (error, result) => {
                if (error) {
                    console.log(error);
                    alert('ไม่สามารถเปลี่ยนบทบาทผู้ใช้งานได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
                } else if (result) {
                    data.forEach((user, idx) => {
                        if (user._id === userId) {
                            data[idx].roles = newRole;
                        }
                    });

                    alert(`เปลี่ยนบทบาทผู้ใช้งาน ${username} เสร็จสิ้น`);
                }
            });
        }
    };

    const handleDelete_user = (props) => {
        const username = props.row.original.username;
        if (window.confirm(`ต้องการลบผู้ใช้งาน ${username} ใช่หรือไม่`)) {
            const userId = props.row.original._id;
            Meteor.call('RemoveUserById', userId, (error, result) => {
                if (error) {
                    console.error(error);
                    alert('ไม่สามารถลบบัญชีผู้ใช้งานได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
                } else if (result) {
                    const dataCopy = [...data];
                    dataCopy.splice(props.row.index, 1);
                    setData(dataCopy);
                    alert(`ลบผู้ใช้งาน ${username} สำเร็จ`);
                }
            });
        }
    };

    const makeData = (users) => {
        let result = [];

        users.forEach((user, idx) => {
            let obj = {};

            obj._id = user._id
            obj.no = idx + 1
            obj.username = user.username
            obj.email = user.emails[0].address
            obj.roles = user.profile.roles

            result.push(obj);
        });

        return result;
    };

    const columns = React.useMemo(() => [
        {
            Header: 'ลำดับที่',
            accessor: 'no'
        },
        {
            // Header: 'Username',
            Header: 'ชื่อผู้ใช้งาน',
            accessor: 'username'
        },
        {
            // Header: 'Email',
            Header: 'อีเมล',
            accessor: 'email'
        },
        {
            // Header: 'Role',
            Header: 'บทบาท',
            id: 'roles',
            accessor: 'roles',

            Cell: (tableProps) => (
                <Select 
                    id = { 'roles' + tableProps.row.id }
                    value={ {label: tableProps.row.values.roles} }
                    options={rolesOptions()}
                    onChange={e => handleChange_role(e, tableProps)}
                    isSearchable={false}
                />
            )
        },
        {
            Header: '',
            id: '_id',
            accessor: '_id',

            Cell: (tableProps) => (
                <div className ='admin'>
                    <button
                    id =  { 'deluser' + tableProps.row.id }
                    className ="button"
                    onClick={() => handleDelete_user(tableProps)}
                >
                    ลบ
                    </button>
                </div>
            )
        }
    ], [data]);

    return (
        <React.Fragment>
            <div className = 'admin'>
            <h1>จัดการผู้ใช้งาน</h1>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <React.Fragment>
                    <div className = 'admin'>
                        <div className = 'card'>
                    
                    <p>{data.length} users</p>
                    </div>
                    </div>
                    <br />

                    <Table id = 'userlist' columns={columns} data={data} />
                </React.Fragment>
            )}
            
        </React.Fragment>
    );
};