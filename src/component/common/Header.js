import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import logo from "../../asset/logo.png";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header({ user }) {
  const history = useHistory();
  const classes = useStyles();
  const [type, setType] = useState("");

  useEffect(() => {
    setType(user);
  }, [user]);

  const linkTarget1 = {
    pathname: "/login/admin",
    key: 1111, // we could use Math.random, but that's not guaranteed unique.
    // state: {
    //   applied: 1
    // }
  };
  const linkTarget2 = {
    pathname: "/login/eo",
    key: 2222, // we could use Math.random, but that's not guaranteed unique.
    // state: {
    //   applied: 2
    // }
  };
  const linkTarget3 = {
    pathname: "/login/voter",
    key: 3333, // we could use Math.random, but that's not guaranteed unique.
    // state: {
    //   applied: 3
    // }
  };
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#121619", paddingBottom: "2px", marginBottom:"20px" }}
      >
        <Toolbar>
          <img src={logo} height="8%" width="10%" />
          <Typography variant="h6" className={classes.title}>
            <Link to="/home" className="logo">
              Voting Service Portal
            </Link>
          </Typography>

          {/* <Link to="/">
            <i class="icon-home">Home</i>
          </Link>
          <Link to="/contact">
            <i class="icon-envelope-alt">Contact</i>
          </Link>
          <Link to="/about">
            <i class="icon-info-sign">About</i>
          </Link> */}

          {type == "eo" || type == "admin" || type == "voter" ? (
            <>
              <Button
                variant="contained"
                color="default"
                className="mr-2"
                startIcon={<DashboardIcon />}
                onClick={() =>
                  user == "eo"
                    ? history.push("/eo/dashboard")
                    : user == "admin"
                    ? history.push("/admin/dashboard")
                    : user == "voter"
                    ? history.push("/voter/dashboard")
                    : null
                }
              >
                Dashboard
              </Button>

              <Button
                variant="contained"
                color="default"
                startIcon={<ExitToAppRoundedIcon />}
                onClick={() =>
                  user == "eo"
                    ? history.push("/logout/eo")
                    : user == "admin"
                    ? history.push("/logout/admin")
                    : user == "voter"
                    ? history.push("/logout/voter")
                    : null
                }
              >
                Logout
              </Button>
            </>
          ) : (
            <DropdownButton
              id="dropdown-button-dark-example2"
              variant="secondary"
              title={
                <>
                  <i class="icon-user"></i> Login
                </>
              }
              className="mt-2"
            >
              <Dropdown.Item id="menu" as={Link} to={linkTarget1}>
                Administrator
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item id="menu" as={Link} to={linkTarget2}>
                Electoral Officer
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item  as={Link} to={linkTarget3}>
                Voter
              </Dropdown.Item>
            </DropdownButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
