import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Card, Chip } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import PaymentCard from "./customers/paymentCard";

const columns = [
  { id: "name", label: "Customer Account Number", minWidth: 170 },
  { id: "code", label: "Merchant Account Number", minWidth: 100 },
  {
    id: "population",
    label: "Status",
    minWidth: 170,
    align: "right",
  },
  {
    id: "size",
    label: "Description",
    minWidth: 170,
    align: "right",
  },
  {
    id: "size",
    label: "Bank Name",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Amount",
    label: "Amount",
    minWidth: 170,
    align: "right",
  },
  {
    id: "a",
    label: "Actions",
    minWidth: 170,
    align: "right",
  },
];

export default function StickyHeadTable() {
  const id = localStorage.getItem("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [fetch, setfetch] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [data, setdata] = useState([]);
  useEffect(() => {
    async function customers() {
      axios
        .get("https://procombackendhr.vercel.app/products")
        .then(async (resp) => {
          await axios
            .get("https://procombackendhr.vercel.app/users/" + id)
            .then((resu) => {
              let a = resp.data?.products?.filter(
                (res) => resu.data[0]?.accountnumber == res?.customerAccountNo
              );
              setdata(a);
            });
        });
    }
    customers();
    setfetch("false");
  }, [fetch]);
  async function onPay(id) {
    axios
      .put("https://procombackendhr.vercel.app/products/" + id, {
        paymentStatus: "success",
      })
      .then((res) => {
        setfetch(true);
      });
  }
  async function onReject(id) {
    axios
      .put("https://procombackendhr.vercel.app/products/" + id, {
        paymentStatus: "reject",
      })
      .then((res) => {
        setfetch(true);
      });
  }
  return (
    <>
      <h1 className="font-weight-bold">Payment</h1>

      <Card > 
        <TableContainer   >
          <Table stickyHeader aria-label="sticky table" >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={"center"}
                    sx={{
                      bgcolor: "#1976d2",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell align={"center"}>
                        {row?.customerAccountNo}
                      </TableCell>
                      <TableCell align={"center"}>
                        {row?.merchantAccountNumber}
                      </TableCell>
                      <TableCell align={"center"}>
                        <Chip
                          label={row?.paymentStatus}
                          color={
                            row?.paymentStatus === "success"
                              ? "success"
                              : row?.paymentStatus === "pending"
                              ? "warning"
                              : "error"
                          }
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align={"center"}>
                        {row?.paymentPurpose}
                      </TableCell>
                      <TableCell align={"center"}>{row?.bank}</TableCell>
                      <TableCell align={"center"}>
                        {row?.paymentAmount} PKR
                      </TableCell>
                      <TableCell align={"right"}>
                        {row?.paymentStatus == "pending" ? (
                          <div style={{ display: "flex", gap: "10px" }}>
                            <Button
                              sx={{ bgcolor: "lightgreen" }}
                              onClick={() => onPay(row?._id)}
                            >
                              Pay
                            </Button>
                            <Button
                              sx={{ bgcolor: "	#FF7F7F" }}
                              onClick={() => onReject(row?._id)}
                            >
                              Reject
                            </Button>
                          </div>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {data.length > 0 ? null : (
          <div style={{ textAlign: "center",margin:'4rem' }}>No Found any request</div>
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}
