import React from 'react';
import DataTable from 'react-data-table-component';

const columns = [
  {
    selector: 'department',
    sortable: true,
    cell: (row) => <div style={{ fontWeight: '500', fontSize: '16px', color: '#050505' }}>{row.department}</div>,
  },
  {
    selector: 'withinDepartment',
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
    selector: 'received',
    center: true,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight: '400'
    }
  },
  {
    name: 'Given',
    selector: 'given',
    center: true,
    sortable: true,
    style: {
      fontSize: '14px',
      fontWeight: '400'
    }
  },
  {
    name: 'Total',
    selector: 'total',
    center: true,
    sortable: true,
    hide: 'sm', // Hide on small screens for better appearance
    style: {
      color: '#5486E3',
      style: {
        fontSize: '14px',
        fontWeight: '400'
      }
    },
  },
];

const data = [
  createData('Automation', 3, 10, 9),
  createData('Cloud', 2, 2, 10),
  createData('Delivery', 16, 13, 19),
  createData('IT Operations', 10, 5, 3),
  createData('ITSM', 15, 15, 15),
];

function createData(department, withinDepartment, received, given) {
  const total = withinDepartment + received + given;
  return { department, withinDepartment, received, given, total };
}

export default function ColumnGroupingTable() {
  return (
    <div style={{ width: '100%' }}>
      <DataTable columns={columns} data={data} defaultSortField="total" />
    </div>
  );
}
