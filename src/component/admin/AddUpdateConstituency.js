import React from "react";
import allStates from "../common/StateList";
import Constituency from "../../model/Constituency";
import AdminService from "../../service/AdminService";
import "../Home.css";
import Header from "../common/Header";

class AddUpdateConstituency extends React.Component {
  service = new AdminService();
  constructor() {
    super();
    this.state = {
      constituency: new Constituency(),
      error: {},
      election: [],
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("admin")) {
      this.service
        .getAllElection()
        .then((result) => {
          this.setState({ election: result.data });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
      if (this.props.match.params.id > 0) {
        this.service
          .getConstituencyById(this.props.match.params.id)
          .then((result) => {
            this.setState({ constituency: result.data });
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    } else {
      this.props.history.push("/login/admin");
      alert("Unauthorized Access Denied");
    }
  }

  validateForm = (e) => {
    let flag = true;
    let error = {};
    var namePattern = new RegExp(/^[a-zA-Z ]+$/);
    if (!this.state.constituency.constituencyName) {
      error.nameError = "Constituency Name Is Required";
      flag = false;
    } else if (!namePattern.test(this.state.constituency.constituencyName)) {
      error.nameError = "Constituency name should contain alphabates only";
      flag = false;
    }
    var areaPattern = new RegExp(/^[a-zA-Z ]+$/);
    if (!this.state.constituency.state) {
      error.stateError = "State is Required";
      flag = false;
    } else if (!areaPattern.test(this.state.constituency.state)) {
      error.stateError = "Name of state should contain alphabates only";
      flag = false;
    }
    var idPattern = new RegExp(/^[0-9\b]+$/);
    if (!this.state.constituency.electionId) {
      error.electionIdError = "Election Id Is Required";
      flag = false;
    } else if (!idPattern.test(this.state.constituency.electionId)) {
      error.electionIdError = "Election Id should contain only digits";
      flag = false;
    }
    this.setState({ error: error });
    return flag;
  };

  render() {
    return (
      <>
        <Header user="admin" />
        <div className="container">
          <form>
            <h1>
              <span className="badge badge-dark">
                {this.state.constituency.constituencyId > 0
                  ? "Update "
                  : "Add "}
                Constituency
              </span>
            </h1>
            {this.state.constituency.constituencyId > 0 ? (
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  value={this.state.constituency.constituencyId}
                  readOnly
                />
              </div>
            ) : null}

            <div className="form-group">
              <div className="alert-danger">{this.state.error.nameError}</div>
              <input
                type="text"
                className="form-control"
                id="constituencyName"
                placeholder="Enter Constituency Name"
                value={this.state.constituency.constituencyName}
                onChange={(e) =>
                  this.setState({
                    constituency: {
                      ...this.state.constituency,
                      constituencyName: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="form-group">
              <div className="alert-danger">{this.state.error.stateError}</div>
              <select
                className="form-control mb-3"
                id="state"
                value={this.state.constituency.state}
                disabled={
                  this.state.constituency.constituencyId > 0 ? true : false
                }
                onChange={(e) =>
                  this.setState({
                    constituency: {
                      ...this.state.constituency,
                      state: e.target.value,
                    },
                  })
                }
              >
                <option value="" disabled selected hidden>
                  Select State
                </option>
                {allStates.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <div className="alert-danger">
                {this.state.error.electionIdError}
              </div>
              <select
                className="form-control mb-3"
                id="electionId"
                value={this.state.constituency.electionId}
                disabled={
                  this.state.constituency.constituencyId > 0 ? true : false
                }
                onChange={(e) =>
                  this.setState({
                    constituency: {
                      ...this.state.constituency,
                      electionId: e.target.value,
                    },
                  })
                }
              >
                <option value="" disabled selected hidden>
                  Select ElectionId
                </option>
                {this.state.election.map((item) => (
                  <option value={item.electionId}>{item.electionId}</option>
                ))}
              </select>
            </div>

            {this.state.constituency.constituencyId > 0 ? (
              <button
                className="btn btn-dark mr-2"
                onClick={(e) => {
                  e.preventDefault();
                  let isValid = this.validateForm();
                  if (!isValid) {
                    return false;
                  }
                  this.service
                    .updateConstituency(
                      this.state.constituency.constituencyId,
                      this.state.constituency.constituencyName
                    )
                    .then((result) => {
                      alert("Successful Updation");
                      this.props.history.push(
                        `/admin/constituency/viewConstituency/${this.state.constituency.constituencyId}`
                      );
                    })
                    .catch((error) => {
                      alert(error.response.data.message);
                    });
                }}
              >
                <i class="icon-pencil" /> Update
              </button>
            ) : (
              <button
                className="btn btn-dark mr-2"
                onClick={(e) => {
                  e.preventDefault();
                  let isValid = this.validateForm();
                  if (!isValid) {
                    return false;
                  }
                  this.service
                    .addConstituency(this.state.constituency)
                    .then((result) => {
                      alert(result.data);
                      this.props.history.push(
                        `/admin/constituency/viewConstituency/${this.state.constituency.constituencyId}`
                      );
                    })
                    .catch((error) => {
                      alert(error.response.data.message);
                    });
                }}
              >
                <i class="icon-plus" /> Add
              </button>
            )}
            <button
              className="btn btn-dark"
              onClick={(e) => {
                this.props.history.push("/admin/constituency/viewConstituency");
              }}
            >
              <i class="icon-remove" /> Cancel
            </button>
          </form>
        </div>
      </>
    );
  }
}
export default AddUpdateConstituency;
