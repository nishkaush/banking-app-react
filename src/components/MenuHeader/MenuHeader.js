import React from "react";
import { AppBar, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
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
      <div className="menu__links">
        <Link to="/transfer-money">Transfer Money</Link>
        <Link to="/open-new-acc">Open Accounts</Link>
      </div>
    </AppBar>
  );
};

export default MenuHeader;
