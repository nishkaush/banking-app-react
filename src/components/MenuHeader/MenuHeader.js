import React from "react";
import { Link } from "react-router-dom";
import "./MenuHeader.css";

const MenuHeader = props => {
  return (
    <div className="menu__header__container">
      <Link to="/">Banking App</Link>
      <div className="menu__links">
        <Link to="/transfer-money">Transfer Money</Link>
        <Link to="/open-new-acc">Open New Accounts</Link>
      </div>
    </div>
  );
};

export default MenuHeader;
