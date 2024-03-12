import * as React from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function BasicTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, backgroundColor: '#1976d2' }} aria-label="simple table">

                <TableHead>
                    <TableRow >
                        <TableCell width={300} sx={{color:'#fff'}}> Customer Name </TableCell>
                        <TableCell width={300} sx={{color:'#fff'}}> Account No </TableCell>
                        <TableCell width={300} sx={{color:'#fff'}}> Merchant No </TableCell>
                        <TableCell width={200} sx={{color:'#fff'}}> Amount </TableCell>
                        <TableCell width={250} sx={{color:'#fff'}}> Bank </TableCell>
                        <TableCell align="right" sx={{color:'#fff'}}> Status </TableCell>
                    </TableRow>
                </TableHead>

            </Table>
        </TableContainer>
    );
}