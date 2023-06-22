import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Table from './Table';
import AddUserPopup from './AddUserPopup';
import BulkUploadPopup from './BulkUploadPopup';
import { CSVLink } from 'react-csv';
import {GiCrown} from 'react-icons/gi';

const API = 'http://backend.letshigh5.com/account/user/'

const ManageUsers = () => {

    const [users, setUsers] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');

    const token = Cookies.get('token')
    const getAllUsers = useCallback(async () => {
      await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`
        }
        }).then(response => {
        let filteredData = response.data;
        if (searchQuery !== '') {
          filteredData = response.data.filter(user => user.user.first_name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        setUsers(filteredData);
      });
    }, [searchQuery, token]);

    useEffect(() => {
      getAllUsers();
    }, [getAllUsers]);

    const headers = [
      " ",
      "Email",
      "First Name",
      "Last Name",
      "Admin Permission",
      "Role",
      "Country",
      "Department",
      "Location",
      "Mode",
      "Allowance Boost",
    ];

    const renderCell = (key, item) => {
      if (key === ' ') {
        return item.user.avtar;
      }
      if (key === 'Email') {
        return item.user.email;
      }
      if (key === 'First Name') {
        return item.user.first_name;
      }
      if (key === 'Last Name') {
        return item.user.last_name;
      }
      if (key === 'Admin Permission') {
        if(item.user.is_admin) {
          return <GiCrown/>;
        } else {
          return "X";
        }
      }
      if (key === 'Role') {
        return item.role;
      }
      if (key === 'Country') {
        return item.country;
      }
      if (key === 'Department') {
        return item.department;
      }
      if (key === 'Location') {
        return item.location;
      }
      if (key === 'Mode') {
        return item.user_mode;
      }
      if (key === 'Allowance Boost') {
        return item.allowance_boost;
      }
      return null;
    };


  return (
    <div>
    <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginBottom: '10px' }}>
    <div className="w-80 absolute left-8 top-2">
    <input type="text" placeholder='Filter users by their names' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
    </div>
      <AddUserPopup/>
      <div style={{ width: '10px' }}></div>
      <BulkUploadPopup />
      <div style={{ width: '10px' }}></div>
        <CSVLink data={users} filename={'users.csv'} className="bg-sky-500 text-center text-white text-light py-2 px-2 mx-2 h-10 rounded-md hover:bg-sky-300 hover:text-black cursor-pointer">Export CSV</CSVLink>
      </div>
    <div>
    <Table 
      headers={headers} 
      data={users} 
      renderCell={renderCell} 
      showEditButton={true}
      showDeleteButton={true}
    />
    </div>
    </div>
  )
}

export default ManageUsers;