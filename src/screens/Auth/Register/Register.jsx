import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";

export default function SignUp() {
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    userName: yup.string().required("UserName is required"),
    accountnumber: yup.number().required("account Number is required"),
    phonenumber: yup.number().required("A phone number is required"),
    password: yup.string().min(6).required("Payment purpose is required"),
  });
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      email: "",
      phonenumber: "",
      accountnumber: "",
      type: "admin",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios
          .post("https://procombackendhr.vercel.app/users", {
            email: values.email,
            password: values.password,
            phonenumber: +values.phonenumber,
            userName: values.userName,
            accountnumber: +values.accountnumber,
            type: "customer",
          })
          .then(async (res) => {
            await axios
              .post("https://procombackendhr.vercel.app/users/login", {
                userName: values.userName,
                password: values.password,
              })
              .then((res) => {
                console.log(res?.data?.token);
                localStorage.setItem("token", res?.data?.token);
              });
            if (res?.data?.type == "customer") {
              navigate("/customer");
            } else {
              navigate("/merchant");
            }
          });
      } catch (e) {
        console.log(e);
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: e.response?.data?.error,
        });
      }
    },
  });

  return (
    <Container component="main" sx={{ maxWidth: "550px" }} maxWidth={false}>
      <Card sx={{ p: 4, mt: 8 }}>
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1976D2" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="userName"
                  label="user name"
                  type="text"
                  id="userName"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.userName && Boolean(formik.errors.userName)
                  }
                  helperText={formik.touched.userName && formik.errors.userName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="accountnumber"
                  label="Account Number"
                  name="accountnumber"
                  // value={formik.values.accountnumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.accountnumber &&
                    Boolean(formik.errors.accountnumber)
                  }
                  helperText={
                    formik.touched.accountnumber && formik.errors.accountnumber
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phonenumber"
                  label="Phone Number"
                  name="phonenumber"
                  // value={formik.values.phonenumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phonenumber &&
                    Boolean(formik.errors.phonenumber)
                  }
                  helperText={
                    formik.touched.phonenumber && formik.errors.phonenumber
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  // value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  // value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to={"/login"}
                  style={{ textDecoration: "none", color: "#1976d2" }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
