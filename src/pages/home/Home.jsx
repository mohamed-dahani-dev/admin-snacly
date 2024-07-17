/* eslint-disable react/prop-types */
import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/sideBar/SideBar";
import "./Home.css";
import { Route, Routes } from "react-router-dom";
import Add from "../add/Add";
import List from "../list/List";
import Order from "../order/Order";

import { useRef, useState } from "react";
import { useEffect } from "react";

const Home = ({ setLogin, setToken }) => {
  // the url of backend
  const url = "https://backend-snacly.onrender.com";

  // scroll button
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 300) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    });
  }, []);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const moveUp = useRef();
  return (
    <div ref={moveUp} className="app">
      <NavBar setLogin={setLogin} setToken={setToken} />
      <div className="diveder" />
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Order url={url} />} />
        </Routes>
      </div>
      <button
        style={{
          opacity: showScrollBtn ? 1 : 0,
        }}
        className="scroll2top icon-keyboard_arrow_up"
        onClick={() => {
          moveUp.current.scrollIntoView({
            block: "start",
          });
        }}
      ></button>
    </div>
  );
};

export default Home;
