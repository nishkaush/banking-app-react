import React from "react";
import { AppBar, makeStyles } from "@material-ui/core";
import { NavLink, Link } from "react-router-dom";
import "./MenuHeader.css";

const useStyles = makeStyles(theme => ({
  menu__header__container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "1%",
    alignContent: "center",
    marginBottom: "2%"
  }
}));

const MenuHeader = props => {
  const classes = useStyles();
  return (
    <AppBar position="relative" className={classes.menu__header__container}>
      <Link to="/">Banking App</Link>
      <div className="menu__NavLinks">
        <NavLink activeClassName="active__Link" to="/" exact>
          Home
        </NavLink>
        <NavLink activeClassName="active__Link" to="/transfer-money" exact>
          Transfer Money
        </NavLink>
        <NavLink activeClassName="active__Link" to="/open-new-acc" exact>
          Open Accounts
        </NavLink>
      </div>
    </AppBar>
  );
};

export default MenuHeader;
