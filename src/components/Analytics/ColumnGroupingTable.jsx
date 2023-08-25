import React, {useState, useEffect} from 'react';
import growUp from '../../assets/images/analytics/growUp.svg';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import './Analytics.css'
export default function ColumnGroupingTable({ departmentData }) {
  const [sortConfig, setSortConfig] = useState({
    key: 'total',
    direction: 'desc'
  });

  const data = departmentData.map(item => ({
    departmentName: item.name || 'Unknown Department',
    departmentPercentage: item.percentage_difference,
    withinDepartment: item.within_department,
    received: item.recipient_outside_department,
    given: item.sender_outside_department,
    total: item.within_department + item.recipient_outside_department + item.sender_outside_department
  }));

  const sortedData = [...data];

  if (sortConfig.key) {
    sortedData.sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];
      
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        if (valueA < valueB) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      }

      if (valueA < valueB) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };


  
  
  
  return (
    <div className='w-full'>
     <table className='w-full'> 
        <thead>
          <tr className='text-white text-[16px]'>
            <th className='bg-[#5486E3] text-start pl-10 py-5 rounded-l-xl font-[500]' colSpan="2">Department</th> 
            <th className='bg-[#5486E3] font-[500]' colSpan="1">Within Department</th> 
            <th className='bg-[#5486E3] font-[500]' colSpan="2">Outside Department</th>
            <th className='bg-[#5486E3] font-[500] rounded-r-xl'></th> 
          </tr>
          <tr>
            <th></th>
            <th></th> 
            <th className='bg-[#EAEEF5]'></th> 
            <th 
              className='py-4 cursor-pointer'
              onClick={() => requestSort('received')}
            >
           <div className='flex justify-center items-center'>
            Received{' '}
            {sortConfig.key === 'received' && (
              <span>{sortConfig.direction === 'asc' ? <AiFillCaretUp /> : <AiFillCaretDown />}</span>
            )}
           </div>
            </th> 
            <th
              className='cursor-pointer'
              onClick={() => requestSort('given')}
            >
              <div className='flex justify-center items-center'>
                Given{' '}
                {sortConfig.key === 'given' && (
                  <span>{sortConfig.direction === 'asc' ? <AiFillCaretUp /> : <AiFillCaretDown />}</span>
                )}
              </div>
            </th> 
            <th
              className='bg-[#EAEEF5] text-[#5486E3] cursor-pointer'
              onClick={() => requestSort('total')}
            >
              <div className='flex justify-center items-center'>
                Total{' '}
                {sortConfig.key === 'total' && (
                  <span>{sortConfig.direction === 'asc' ? <AiFillCaretUp /> : <AiFillCaretDown />}</span>
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className='p-4'>
            {sortedData?.map((rowData, rowIndex) => (
              <tr key={rowIndex} >
                <td className='w-[25%] pl-10 '>
                  <div className='border-b-[1px] py-3'>{rowData.departmentName}</div>
                </td>
                <td >
                  <div className='pr-4 border-b-[1px] py-[14px]'>
                  <div className='w-28 flex rounded-md justify-evenly text-[12px] md:text-[8px] bg-[#D6FBF0] text-[#285C55] font-semibold py-1'>
                    <img src={growUp} alt='grow-up'/>
                    {`${rowData.departmentPercentage}% from last month`}
                  </div>
                  </div>
                </td>
                <td className='text-center w-[20%] bg-[#EAEEF5]'>
                 <div className='py-3 border-b-[1px] '>{rowData.withinDepartment}</div>
                </td>
                <td className='text-center w-[18%]'>
                <div className=' py-3 border-b-[1px]'>{rowData.received}</div>
                </td>
                <td className='text-center w-[18%]'>
                <div className='py-3 border-b-[1px]'>{rowData.given}</div>
                </td>
                <td className='text-center w-[20%] px-10 bg-[#EAEEF5]'>
                  <div className='border-b-[1px] py-3 text-[#5486E3]'>{rowData.total}</div>
                </td>
              </tr>
            ))}
      </tbody>
     </table>
    </div>
  );
}
