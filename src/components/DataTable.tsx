import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PublicIcon from '@mui/icons-material/Public';
import KeyboardIcon from '@mui/icons-material/Keyboard';

type Props = {
    rows:any[],
    columns:Column[],
    handleDelete?:(id:string | undefined)=>void,
    handleEdit?:(id:string | undefined)=>void,
    action:boolean,
    origen?:boolean,
    size?:'medium'|'small'
}

export default function DataTable({rows, columns, handleDelete, handleEdit, action, size='medium',origen=false}:Props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(event);
    
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ minHeight: 450 }}>
        <Table stickyHeader aria-label="sticky table" size={size}>
          <TableHead>
            <TableRow>
              {origen && (<TableCell align='left'>Manual/Online</TableCell>)}
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              {action && <TableCell align='left'>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {
                      origen && (<TableCell align='center'>{ row.manual ? (<KeyboardIcon color='primary' />):(<PublicIcon color='secondary' />)}</TableCell>)
                    }
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {
                            column.format && typeof value === 'number'
                            ? column.format(value)
                            : value
                          }
                        </TableCell>
                      );
                    })}
                    {
                      action && (
                        <TableCell>
                          <IconButton aria-label="edit" color='secondary' onClick={()=> handleEdit?.(row.id)}>
                              <EditIcon />
                          </IconButton>
                          <IconButton aria-label="delete" color='error' onClick={()=> handleDelete?.(row.id)}>
                              <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      )
                    }
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage='Filas por Página'
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}