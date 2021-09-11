import React from "react";
import AdminService from "../../service/AdminService";
import Election from "../../model/Election";
import allStates from "../common/StateList";
import "../Home.css";
import Header from "../common/Header";

class AddUpdateElection extends React.Component {
  service = new AdminService();

  constructor() {
    super();
    this.state = {
      election: new Election(),
      error: {},
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("admin")) {
      if (this.props.match.params.id > 0) {
        this.service
          .getElectionById(this.props.match.params.id)
          .then((result) => {
            this.setState({ election: result.data });
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

  validateForm() {
    let flag = true;
    let error = {};

    var namePattern = new RegExp(/^[a-zA-Z ]+$/);
    if (!this.state.election.electionName) {
      flag = false;
      error.nameError = "Election Name Is Required";
    } else if (!namePattern.test(this.state.election.electionName)) {
      error.nameError = "Election Name should contain alphabates only..";
      flag = false;
    }

    if (!this.state.election.electionType) {
      error.typeError = "Election State Is Required";
      flag = false;
    } else if (!namePattern.test(this.state.election.electionType)) {
      error.typeError = "Election State is invalid..";
      flag = false;
    }

    var datePattern = new RegExp(/^([0-9]{2})-([0-9]{2})-([0-9]{4})$/);
    if (!this.state.election.electionDate) {
      flag = false;
      error.dateError = "Election Date Is Required";
    } else if (!datePattern.test(this.state.election.electionDate)) {
      error.dateError = "Change your Format(dd-mm-yyyy)";
      flag = false;
    }
    this.setState({ error: error });
    return flag;
  }

  render() {
    return (
      <>
        <Header user="admin" />
        <div className="container">
          <form>
            <h1>
              <span className="badge badge-dark">
                {this.state.election.electionId > 0 ? "Update " : "Add "}
                Election
              </span>
            </h1>
            {this.state.election.electionId > 0 ? (
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="electionId"
                  value={this.state.election.electionId}
                  readOnly
                />
              </div>
            ) : null}
            <div className="form-group">
              <div className="alert-danger">{this.state.error.nameError}</div>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Election Name"
                value={this.state.election.electionName}
                onChange={(e) =>
                  this.setState({
                    election: {
                      ...this.state.election,
                      electionName: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="form-group">
              <div className="alert-danger">{this.state.error.typeError}</div>
              <select
                className="form-control mb-3"
                id="type"
                value={this.state.election.electionType}
                disabled={this.state.election.electionId > 0 ? true : false}
                onChange={(e) =>
                  this.setState({
                    election: {
                      ...this.state.election,
                      electionType: e.target.value,
                    },
                  })
                }
              >
                <option value="" disabled selected hidden>
                  Select State
                </option>
                {allStates.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <div className="alert-danger">{this.state.error.dateError}</div>
              <input
                type="text"
                className="form-control"
                id="date"
                placeholder="Enter Election Date"
                value={this.state.election.electionDate}
                onChange={(e) =>
                  this.setState({
                    election: {
                      ...this.state.election,
                      electionDate: e.target.value,
                    },
                  })
                }
              />
            </div>
            {this.state.election.electionId > 0 ? (
              <button
                className="btn btn-dark mr-2"
                onClick={(e) => {
                  e.preventDefault();
                  let isValid = this.validateForm();
                  if (!isValid) {
                    return false;
                  }
                  this.service
                    .updateElectionType(this.state.election)
                    .then((result) => {
                      this.service
                        .updateElectionDate(this.state.election)
                        .then((result) => {
                          this.service
                            .updateElectionName(this.state.election)
                            .then((result) => {
                              alert("Successful Updation");
                              this.props.history.push(
                                `/admin/election/viewElection/${this.state.election.electionId}`
                              );
                            })
                            .catch((error) => {
                              alert(error.response.data.message);
                            });
                        })
                        .catch((error) => {
                          alert(error.response.data.message);
                        });
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
                    .addElection(this.state.election)
                    .then((result) => {
                      alert(result.data);
                      this.props.history.push(
                        `/admin/election/viewElection/${this.state.election.electionId}`
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
                this.props.history.push("/admin/election/viewElection");
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

export default AddUpdateElection;
