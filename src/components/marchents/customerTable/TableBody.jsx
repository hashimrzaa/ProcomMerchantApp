import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function BasicTable() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    async function customers() {
      axios
        .get("https://procombackendhr.vercel.app/users")
        .then((res) => {
          setdata(res.data);
        });
    }
    customers();
  }, []);
  return (
    <>
      <TableContainer>
        <Table component={Paper} sx={{}} aria-label="simple table">
          <TableBody>
            {data.map((data, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell> {data?.userName} </TableCell>
                <TableCell align="center">{data?.email}</TableCell>
                <TableCell align="center">{data?.accountnumber}</TableCell>
                <TableCell align="center">{data?.phonenumber}</TableCell>
                <TableCell align="right">{data?.phonenumber} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
