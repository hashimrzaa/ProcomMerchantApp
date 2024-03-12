import React, { useState } from "react";
import { UserContextProvider } from "./context/userContextProvider";
import Routing from "./routes/Routing";
import './index.css'
const App = () => {
  const [isUser, setIsUser] = useState(false);
  return (
    <UserContextProvider value={{ isUser, setIsUser }}>
      <Routing />
    </UserContextProvider>
  );
};

export default App;
