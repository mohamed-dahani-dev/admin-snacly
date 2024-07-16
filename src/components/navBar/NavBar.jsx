/* eslint-disable react/prop-types */
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const NavBar = ({ setLogin }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("currentMode") ?? "dark"
  );
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    }
  }, [theme]);

  // log out

  const logOut = () => {
    setLogin(false);
    toast.success("Logged out successfully");
  };
  return (
    <>
      <div className="navbar">
        <Link to="/">
          <h1 className="logo">Snackly</h1>
        </Link>

        <span className="icon-user">
          <ul className="logout">
            <li onClick={logOut}>
              <span className="icon-sign-out" />
              <p>Logout</p>
            </li>
          </ul>
        </span>

        <button
          onClick={() => {
            // send value to ls
            localStorage.setItem(
              "currentMode",
              theme === "dark" ? "light" : "dark"
            );

            // get value from ls
            setTheme(localStorage.getItem("currentMode"));
          }}
          className="mode"
        >
          {theme === "dark" ? (
            <span className="icon-moon-o"></span>
          ) : (
            <span className="icon-sunny"></span>
          )}
        </button>
      </div>
      <h4 className="admin-panel">Admin Panel</h4>
    </>
  );
};

export default NavBar;
