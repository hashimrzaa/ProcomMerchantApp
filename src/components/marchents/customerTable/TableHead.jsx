import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function BasicTable() {


  return (
    <TableContainer>
      <Table
        component={Paper}
        sx={{ backgroundColor: "#1976d2" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#fff" }}> Name </TableCell>
            <TableCell align="right" sx={{ color: "#fff" }}> Email </TableCell>
            <TableCell align="right" sx={{ color: "#fff" }}> Account No </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}> Phone No </TableCell>
            <TableCell align="right" sx={{ color: "#fff" }}>
              {" "}
              Phone{" "}
            </TableCell>
          
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}
