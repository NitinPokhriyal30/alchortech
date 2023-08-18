import React from 'react';
import DataTable from 'react-data-table-component';



export default function ColumnGroupingTable({departmentData}) {


  const columns = [
    {
      selector: row => row.department,
      sortable: true,
      minWidth: '350px', 
      cell: (row, rowIndex) => {
        const data = departmentData[rowIndex]; // Get data for the current row
        const percentage = data?.percentage_difference;

        return (
          <div className='grid grid-cols-3'>
            <div className='col-span-2'
              style={{
                fontWeight: '500',
                fontSize: '16px',
                color: '#050505',
              }}
            >
              {row.department}
            </div>
            <div className='px-2 py-[4px] text-[9px] text-[#285C55] rounded-md bg-[#D6FBF0]'>
              {`${percentage}% from last month`}
            </div>
          </div>
        );
      },
      
    },
    {
      selector: row => row.withinDepartment,
      center: true,
      style: {
        backgroundColor: '#E5EDFB',
        fontWeight: '400',
        fontSize: '14px',
        font: 'Lato'
      },
      ignoreRowClick: true,
    },
    {
      name: 'Received',
      selector: row => row.received,
      center: true,
      sortable: true,
      style: {
        fontSize: '14px',
        fontWeight: '400'
      }
    },
    {
      name: 'Given',
      selector: row => row.given,
      center: true,
      sortable: true,
      style: {
        fontSize: '14px',
        fontWeight: '400'
      }
    },
    {
      name: 'Total',
      selector: row => row.total,
      center: true,
      sortable: true,
      style: {
        color: '#5486E3',
        style: {
          fontSize: '14px',
          fontWeight: '900'
        }
      },
    },
  ];

  const transformedData = departmentData.map(item => {
    return createData(
      item.name || 'Unknown Department',
      item.within_department,
      item.recipient_outside_department,
      item.sender_outside_department
    );
  });
  
  function createData(department, withinDepartment, received, given) {
    const total = withinDepartment + received + given;
    return { department, withinDepartment, received, given, total };
  }

  return (
    <div style={{ width: '100%', paddingLeft: '30px', paddingRight: '30px'}}>
      <DataTable columns={columns} data={transformedData} defaultSortField="total" />
    </div>
  );
}