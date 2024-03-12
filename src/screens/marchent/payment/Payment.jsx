import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PaymentCard from "../../../components/marchents/PaymentCard";
import TableHead from "../../../components/marchents/paymentTable/TableHead";
import TableBody from "../../../components/marchents/paymentTable/TableBody";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

const Payment = () => {
  // UseNavigate
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  useEffect(() => {
    async function customers() {
      axios.get("https://procombackendhr.vercel.app/products").then((res) => {
        console.log(res.data?.products);
        setdata(res.data?.products);
      });
    }
    customers();
  }, []);
  return (
    <>
      <Box>
        <Box
          sx={{
            marginBottom: "50px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5"> Payments </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/merchant/paymentrequest")}
          >
            {" "}
            <AddIcon fontSize="small" /> Payment Request{" "}
          </Button>
        </Box>

        <Box>
          {/*  Payment History Cards 
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            <PaymentCard
              title={"All Payments"}
              amount={"33,676"}
              records={data.length}
              borderCOlor={"#1976d2"}
              chipColor={"primary"}
              bgColor={"#ebf5ff"}
            />
            <PaymentCard
              title={"Succeed"}
              amount={"33,676"}
              records={"267"}
              borderCOlor={"#2e7d32"}
              chipColor={"success"}
              bgColor={"#f2faf2"}
            />
            <PaymentCard
              title={"Pending"}
              amount={"3,676"}
              records={"67"}
              borderCOlor={"#d99902"}
              chipColor={"warning"}
              bgColor={"#faf8f5"}
            />
            <PaymentCard
              title={"Rejected"}
              amount={"1,676"}
              records={"26"}
              borderCOlor={"#d32f2f"}
              chipColor={"error"}
              bgColor={"#f7eded"}
            />
          </Box> */}

          <TableHead />

          {/* Table Body */}
          <TableBody />
        </Box>
      </Box>
    </>
  );
};

export default Payment;
