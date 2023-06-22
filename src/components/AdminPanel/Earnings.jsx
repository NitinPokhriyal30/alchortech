import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Table from './Table';
import { CSVLink } from 'react-csv';

const API = 'http://backend.letshigh5.com/account/user/'

const Earnings = () => {

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
      "Cost center",
      "Department",
      "Location",
      "Role",
      "Lifetime Earnings",
      "Earnings",
      "Current Balance",
      "Current Balance in INR",
      "Recognition Received",
      "Unique Givers"
    ];

    const renderCell = (key, item) => {
      if (key === ' ') {
        return " ";
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
      if (key === 'Cost center') {
          return " ";
      }
      if (key === 'Department') {
        return item.department;
      }
      if (key === 'Location') {
        return item.location;
      }
      if (key === 'Role') {
        return item.role;
      }
      if (key === 'Lifetime Earnings') {
        return "25 points";
      }
      if (key === 'Earnings') {
        return " ";
      } 
      if (key === 'Current Balance') {
        return "25 points";
      }
      if (key === 'Current Balance in INR') {
        return "Rs 2.50";
      }
      if (key === 'Recognition Received') {
        return 0;
      }
      if (key === 'Unique Givers') {
        return 0;
      }
      return null;
    };


  return (
    <div>
    <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginBottom: '10px' }}>
    <div className='search-bar'>
    <input type="text" placeholder='Filter users by their names' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
    </div>
        <CSVLink data={users} filename={'users.csv'} className="model-btn">Export CSV</CSVLink>
    </div>
    <div>
    <Table 
      headers={headers} 
      data={users} 
      renderCell={renderCell} 
      showDetailsButton = {true}
    />
    </div>
    </div>
  )
}

export default Earnings;