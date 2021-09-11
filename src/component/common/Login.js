import React from "react";
import AdminService from "../../service/AdminService";
import EoService from "../../service/EoService";
import VoterService from "../../service/VoterService";
import "../Home.css";
import Header from "./Header";
import emblemIndia from "../../asset/emblemIndia.jpg";
import {Link} from "react-router-dom";

class Login extends React.Component {
  adminService = new AdminService();
  eoService = new EoService();
  voterService = new VoterService();

  constructor() {
    super();
    this.state = {
      admin: {},
      eo: {},
      voter: {},
      error: {},
      user: "",
      eye: false,
    };
  }

  componentDidMount() {

    if (sessionStorage.getItem("admin") != null) {
      this.props.history.push("/admin/dashboard");
    }
    if (sessionStorage.getItem("eo") != null) {
      this.props.history.push("/eo/dashboard");
    }
    if (sessionStorage.getItem("voter") != null) {
      this.props.history.push("/voter/dashboard");
    }

    if (
      this.props.match.params.user == "admin" ||
      this.props.match.params.user == "eo" ||
      this.props.match.params.user == "voter"
    ) {
      this.setState({ user: this.props.match.params.user });
    } else {
      this.props.history.push("/");
    }
  }

  componentDidUpdate(previousProps) {
    if (previousProps.location.key !== this.props.location.key) {
      this.setState({ user: this.props.match.params.user });
    }
  }

  validateLoginForm() {
    let flag = true;
    let error = {};
    if (this.state.user == "admin") {
      if (!this.state.admin.adminId) {
        error.userIdError = "Admin Id Is Required";
        flag = false;
      }
      if (!this.state.admin.adminPassword) {
        error.passwordError = "Password Is Required";
        flag = false;
      }
    } else if (this.state.user == "eo") {
      if (!this.state.eo.electoralOfficerId) {
        error.userIdError = "Electoral Officer Id Is Required";
        flag = false;
      }
      if (!this.state.eo.electoralOfficerPassword) {
        error.passwordError = "Password Is Required";
        flag = false;
      }
    } else if (this.state.user == "voter") {
      if (!this.state.voter.aadhaarId) {
        error.userIdError = "Adhaar Id Is Required";
        flag = false;
      }
      if (!this.state.voter.voterPassword) {
        error.passwordError = "Password Is Required";
        flag = false;
      }
    }
    this.setState({ error: error });
    return flag;
  }

  render() {
    return (
      <>
        <Header />
        <div className="logincontainer">
          <div className="loginleft" style={{ backgroundImage: `url(${emblemIndia})` }}></div>
          <div className="loginright">
          <form style={{height: "100%", margin: "50px", padding: "5%", border: "2px solid #121619"}}>
            <h1>
              <span className="badge badge-dark">
                {this.state.user == "admin"
                  ? "Administrator "
                  : this.state.user == "eo"
                  ? "Electoral Officer "
                  : this.state.user == "voter"
                  ? "Voter "
                  : null}
                Login
              </span>
            </h1>
            <div className="form-group mr2">
              <div className="alert-danger">{this.state.error.userIdError}</div>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter UserId"
                value={
                  this.state.user == "admin"
                    ? this.state.admin.adminId
                    : this.state.user == "eo"
                    ? this.state.eo.electoralOfficerId
                    : this.state.user == "voter"
                    ? this.state.voter.aadhaarId
                    : null
                }
                onChange={(e) => {
                  if (this.state.user == "admin") {
                    this.setState({
                      admin: { ...this.state.admin, adminId: e.target.value },
                    });
                  } else if (this.state.user == "eo") {
                    this.setState({
                      eo: {
                        ...this.state.eo,
                        electoralOfficerId: e.target.value,
                      },
                    });
                  } else if (this.state.user == "voter") {
                    this.setState({
                      voter: { ...this.state.voter, aadhaarId: e.target.value },
                    });
                  }
                }}
              />
            </div>
            <div className="form-group">
              <div className="alert-danger">
                {this.state.error.passwordError}
              </div>
              <div className="input-group">
                <input
                  type={!this.state.eye ? "password" : "text"}
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  value={
                    this.state.user == "admin"
                      ? this.state.admin.adminPassword
                      : this.state.user == "eo"
                      ? this.state.eo.electoralOfficerPassword
                      : this.state.user == "voter"
                      ? this.state.voter.voterPassword
                      : null
                  }
                  onChange={(e) => {
                    if (this.state.user == "admin") {
                      this.setState({
                        admin: {
                          ...this.state.admin,
                          adminPassword: e.target.value,
                        },
                      });
                    } else if (this.state.user == "eo") {
                      this.setState({
                        eo: {
                          ...this.state.eo,
                          electoralOfficerPassword: e.target.value,
                        },
                      });
                    } else if (this.state.user == "voter") {
                      this.setState({
                        voter: {
                          ...this.state.voter,
                          voterPassword: e.target.value,
                        },
                      });
                    }
                  }}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-dark"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ eye: !this.state.eye });
                    }}
                  >
                    {!this.state.eye ? (
                      <i className="icon-eye-close" />
                    ) : (
                      <i className="icon-eye-open" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="alert-danger">
                {this.state.error.invalidCredential}
              </div>
            </div>
            <button
              className="btn btn-dark"
              onClick={(e) => {
                e.preventDefault();
                let isValid = this.validateLoginForm();
                if (!isValid) {
                  return false;
                }
                if (this.state.user == "admin") {
                  this.adminService
                    .adminLogin(this.state.admin)
                    .then((result) => {
                      this.setState({ admin: result.data });
                      sessionStorage.removeItem("eo");
                      sessionStorage.removeItem("voter");
                      sessionStorage.setItem(
                        "admin",
                        JSON.stringify(this.state.admin.adminId)
                      );
                      this.props.history.push("/admin/dashboard");
                    })
                    .catch((error) => {
                      this.setState({
                        error: { invalidCredential: "Invalid Credential" },
                      });
                    });
                } else if (this.state.user == "eo") {
                  this.eoService
                    .eoLogin(this.state.eo)
                    .then((result) => {
                      this.setState({ eo: result.data });
                      sessionStorage.removeItem("admin");
                      sessionStorage.removeItem("voter");
                      sessionStorage.setItem(
                        "eo",
                        JSON.stringify(this.state.eo.electoralOfficerId)
                      );
                      this.props.history.push("/eo/dashboard");
                    })
                    .catch((error) => {
                      this.setState({
                        error: { invalidCredential: "Invalid Credential" },
                      });
                    });
                } else if (this.state.user == "voter") {
                  this.voterService
                    .voterLogin(this.state.voter)
                    .then((result) => {
                      this.setState({ voter: result.data });
                      sessionStorage.removeItem("admin");
                      sessionStorage.removeItem("eo");
                      sessionStorage.setItem(
                        "voter",
                        JSON.stringify(this.state.voter.aadhaarId)
                      );
                      this.props.history.push("/voter/dashboard");
                    })
                    .catch((error) => {
                      this.setState({
                        error: { invalidCredential: "Invalid Credential" },
                      });
                    });
                } else {
                  alert("Oops! An Error Occured");
                }
              }}
            >
              Login
            </button>
            {this.state.user == 'voter' ? <div style={{marginTop: "3%"}}>Do not have an account? <Link to="/voterRegistration">Register Now</Link></div> : null}
          </form>
        </div>
      </div>
      </>
    );
  }
}

export default Login;
