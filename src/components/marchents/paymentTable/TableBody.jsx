import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip } from "@mui/material";
import { TablePagination } from "@mui/base";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function BasicTable() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    async function customers() {
      axios
        .get("https://procombackendhr.vercel.app/products")
        .then((res) => {
          setdata(res.data);
        });
    }
    customers();
  }, []);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {data.products?.map((data, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell width={300}> {data?.username} </TableCell>
                <TableCell width={300}>{data?.customerAccountNo}</TableCell>
                <TableCell width={300}>{data?.merchantAccountNumber}</TableCell>
                <TableCell width={200}>{data?.paymentAmount} PKR </TableCell>
                <TableCell width={250}>{data?.bank}</TableCell>
                <TableCell>{data?.date}</TableCell>
                <TableCell align="right">
                  {" "}
                  <Chip
                    label={data?.paymentStatus}
                    color={
                      data?.paymentStatus === "success"
                        ? "success"
                        : data?.paymentStatus === "pending"
                        ? "warning"
                        : "error"
                    }
                    variant="outlined"
                  />{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
