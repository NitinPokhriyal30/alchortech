import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'department', label: '', minWidth: 170 },
  { id: 'withinDepartment', label: '', minWidth: 100 },
  {
    id: 'received',
    label: 'Received',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'given',
    label: 'Given',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'total',
    label: '',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(department, withinDepartment, received, given) {
  const total =  (withinDepartment + received + given);
  return { department, withinDepartment, received, given, total };
}

const rows = [
  createData('Automation', '3', 10, 9),
  createData('Cloud', '2', 2, 10),
  createData('Delivery', '16', 13, 19),
  createData('IT Operations', '10', 5, 3),
  createData('ITSM', '15', 15, 15),
];

export default function ColumnGroupingTable() {

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow>
              <TableCell align="center" colSpan={1} style={{backgroundColor: '#5486E3', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px'}}>
                Department
              </TableCell>
              <TableCell align="center" colSpan={1} style={{backgroundColor: '#5486E3'}}>
                Within Department
              </TableCell>
              <TableCell align="center" colSpan={2} style={{backgroundColor: '#5486E3'}}>
                Outside Department
              </TableCell>
              <TableCell align="center" colSpan={1} style={{backgroundColor: '#5486E3', borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}}></TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}