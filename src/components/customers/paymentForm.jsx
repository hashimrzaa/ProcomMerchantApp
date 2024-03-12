import * as React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Autocomplete, Card } from "@mui/material";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  merchantAccountNo: yup
    .string()
    .required("Merchant account number is required"),
  customerAccountNo: yup
    .string()
    .required("Customer account number is required"),
  paymentAmount: yup.number().required("Payment amount is required"),
  bank: yup.string().required("Select a bank"),
  paymentPurpose: yup.string().required("Payment purpose is required"),
});

export default function InstantPaymentForm() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      merchantAccountNo: "",
      customerAccountNo: "",
      paymentAmount: "",
      bank: "",
      paymentPurpose: "",
      saveAddress: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);

      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Success",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
  const buttonStyle = {
    width: "100%",
  };
  return (
    <Card sx={{maxWidth:'700px',margin:'auto'}}>
      <Typography sx={{color:'white',bgcolor:'#1976D2',textAlign:'center',p:2}} variant="h4" className="font-weight-bold" gutterBottom>
        Instant Payment 
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        style={{ maxWidth: "600px", margin: "auto", borderRadius: "8px" ,padding:'20px'}}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="username"
              name="username"
              label="Username"
              fullWidth
              variant="outlined"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="merchantAccountNo"
              name="merchantAccountNo"
              label="Merchant Account Number"
              fullWidth
              variant="outlined"
              value={formik.values.merchantAccountNo}
              onChange={formik.handleChange}
              error={
                formik.touched.merchantAccountNo &&
                Boolean(formik.errors.merchantAccountNo)
              }
              helperText={
                formik.touched.merchantAccountNo &&
                formik.errors.merchantAccountNo
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="customerAccountNo"
              name="customerAccountNo"
              label="Customer Account Number"
              fullWidth
              variant="outlined"
              value={formik.values.customerAccountNo}
              onChange={formik.handleChange}
              error={
                formik.touched.customerAccountNo &&
                Boolean(formik.errors.customerAccountNo)
              }
              helperText={
                formik.touched.customerAccountNo &&
                formik.errors.customerAccountNo
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="paymentAmount"
              name="paymentAmount"
              label="Payment Amount"
              fullWidth
              type="number"
              variant="outlined"
              value={formik.values.paymentAmount}
              onChange={formik.handleChange}
              error={
                formik.touched.paymentAmount &&
                Boolean(formik.errors.paymentAmount)
              }
              helperText={
                formik.touched.paymentAmount && formik.errors.paymentAmount
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={["Bank Al Habib"]}
              value={formik.values.bank}
              onChange={(e, v) => {
                console.log(v);
                formik.values.bank = v;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Bank Name"
                  error={formik.touched.bank && Boolean(formik.errors.bank)}
                  helperText={formik.touched.bank && formik.errors.bank}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="paymentPurpose"
              name="paymentPurpose"
              label="Payment Purpose"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              style={{
                marginTop: "8px",
              }}
              value={formik.values.paymentPurpose}
              onChange={formik.handleChange}
              error={
                formik.touched.paymentPurpose &&
                Boolean(formik.errors.paymentPurpose)
              }
              helperText={
                formik.touched.paymentPurpose && formik.errors.paymentPurpose
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Button
                style={buttonStyle}
                variant="contained"
                endIcon={<SendIcon />}
                type="submit"
              >
                Pay
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}
