import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ Component }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isUser, setisUser] = useState(false);

  useEffect(() => {
    if (token) {
      setisUser(true);
    } else {
      setisUser(false);
      navigate("/login");
    }
  }, []);
  return <>{isUser ? Component : " loading..."}</>;
};

export default ProtectedRoutes;
