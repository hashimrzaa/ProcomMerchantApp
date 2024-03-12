import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../screens/Auth/Register/Register";
import Marchent from "../screens/marchent/Marchent";
import Customer from "../screens/customer/Customer";
import Customers from "../screens/marchent/customers/Customers";
import Payment from "../screens/customer/payments/Payment";
import PaymentM from "../screens/marchent/payment/Payment";
import InstantPayment from "../screens/customer/InstantPayment/InstantPayment";
import PaymentRequest from "../screens/marchent/paymentRequest/PaymentRequest";
import Login from "../screens/Auth/Login/Login";
import Error404 from "../404";
import ProtectedRoutes from "./ProtectedRoutes";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<ProtectedRoutes Component={<Login />} />} />
        <Route path="register" element={<Register />} />

        {/* //Routing for Customer Dashboard */}
        <Route
          path="customer"
          element={<ProtectedRoutes Component={<Customer />} />}
        >
          <Route path="" element={<Payment />} />
          <Route path="instantpayment" element={<InstantPayment />} />
        </Route>

        {/* //Routing for Merchent Dashboard */}
        <Route
          path="merchant"
          element={<ProtectedRoutes Component={<Marchent />} />}
        >
          <Route path="customers" element={<Customers />} />
          <Route path="" element={<PaymentM />} />
          <Route path="paymentrequest" element={<PaymentRequest />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
