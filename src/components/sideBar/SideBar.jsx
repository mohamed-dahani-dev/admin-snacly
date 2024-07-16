import { NavLink } from "react-router-dom";
import "./SideBar.css";
const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-option">
        <NavLink to="/add" className="sidebar-options">
          <span className="icon-plus-alt" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-options">
          <span className="icon-clipboard" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-options">
          <span className="icon-box" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
