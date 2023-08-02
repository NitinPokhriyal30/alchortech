import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'department', label: '', align: 'left', minWidth: 170 },
  { id: 'withinDepartment', label: '', align: 'center', minWidth: 100, backgroundColor: '#EAEEF5'},
  {
    id: 'received',
    label: 'Received',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'given',
    label: 'Given',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'total',
    label: 'Total',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
];

function createData(department, withinDepartment, received, given) {
  const total =  (withinDepartment + received + given);
  return { department, withinDepartment, received, given, total };
}

const rows = [
  createData('Automation', 3, 10, 9),
  createData('Cloud', 2, 2, 10),
  createData('Delivery', 16, 13, 19),
  createData('IT Operations', 10, 5, 3),
  createData('ITSM', 15, 15, 15),
];

export default function ColumnGroupingTable() {

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow>
              <TableCell  colSpan={1} style={{
                backgroundColor: '#5486E3',
                borderTopLeftRadius: '10px',
                borderBottomLeftRadius: '10px',
                color: 'white',
                fontSize: '16px',
                fontFamily: 'Lato',
                fontWeight: 'regular'
              }} >
                Department
              </TableCell>
              <TableCell align="center" colSpan={1} class="bg-[#5486E3] text-white text-[16px] font-Lato font-medium">
                Within Department
              </TableCell>
              <TableCell align="center" colSpan={2} class="bg-[#5486E3] text-white text-[16px] font-Lato font-medium">
                Outside Department
              </TableCell>
              <TableCell align="center" colSpan={1} class="bg-[#5486E3] rounded-r-lg" ></TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                  class='py-4'
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow hover role="checkbox" key={index} class='px-1'>
                <TableCell align="left" style={{
                  paddingLeft: '16px'
                }}  >
                  {row.department}
                </TableCell>
                <TableCell
                  align="center"
                  className={row.withinDepartment ? 'bg-[#EAEEF5]' : ''}
                >
                  {row.withinDepartment}
                </TableCell>
                <TableCell align="center">{row.received}</TableCell>
                <TableCell align="center">{row.given}</TableCell>
                <TableCell
                  align="center"
                  className={row.total ? 'bg-[#EAEEF5]' : ''}
                >
                  <div>{row.total}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}