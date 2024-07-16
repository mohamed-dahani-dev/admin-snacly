import { useState } from "react";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

const App = () => {
  const [login, setLogin] = useState(false);
  return (
    <>
      {login ? <></> : <Login setLogin={setLogin} login={login} />}
      {login ? <Home setLogin={setLogin} /> : <></>}
    </>
  );
};

export default App;
