import React from "react";
import Party from "../../model/Party";
import AdminService from "../../service/AdminService";
import "../Home.css";
import Header from "../common/Header";

class AddParty extends React.Component {
  service = new AdminService();

  constructor() {
    super();
    this.state = {
      party: new Party(),
      error: {},
      id: 0,
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("admin")) {
      this.state.id =
        this.props.match.params.id != 0 ? this.props.match.params.id : 0;
      if (this.state.id != 0) {
        this.service
          .getPartyById(this.state.id)
          .then((result) => {
            this.setState({ party: result.data });
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
    var partyIdPattern = new RegExp(/^([a-z A-Z 0-9 ])+$/);
    if (!this.state.party.regId) {
      error.regIdError = "Reg ID Is Required";
      flag = false;
    } else if (!partyIdPattern.test(this.state.party.regId)) {
      error.regIdError = "Reg Id is inavalid..";
      flag = false;
    }

    var partyNamePattern = new RegExp(/^([a-z A-Z 0-9 ])+$/);
    if (!this.state.party.partyName) {
      error.nameError = "Party Name Is Required";
      flag = false;
    } else if (!partyNamePattern.test(this.state.party.partyName)) {
      error.nameError = "Name is inavalid..";
      flag = false;
    }

    var namePattern = new RegExp(/^[a-zA-Z ]+$/);
    if (!this.state.party.leader) {
      error.leaderError = "Leader Is Required";
      flag = false;
    } else if (!namePattern.test(this.state.party.leader)) {
      error.leaderError = "Name should contain alphabates only..";
      flag = false;
    }

    if (!this.state.party.symbol) {
      error.symbolError = "Symbol Is Required";
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
                {this.state.id != 0
                  ? "Update "
                  : "Add "}
                Party
              </span>
            </h1>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="id"
                placeholder="Enter Party Reg. Id"
                value={this.state.party.regId}
                onChange={(e) =>
                  this.setState({
                    party: {
                      ...this.state.party,
                      regId: e.target.value,
                    },
                  })
                }
                readOnly={this.state.id != 0 ? true : false}
              />
            </div>
            <div className="form-group">
              <div className="alert-danger">{this.state.error.nameError}</div>
              <input
                type="text"
                className="form-control"
                id="partyName"
                placeholder="Enter Party Name"
                value={this.state.party.partyName}
                onChange={(e) =>
                  this.setState({
                    party: {
                      ...this.state.party,
                      partyName: e.target.value,
                    },
                  })
                }
                readOnly={this.state.id != 0 ? true : false}
              />
            </div>
            <div className="form-group">
              <div className="alert-danger">{this.state.error.leaderError}</div>
              <input
                type="text"
                className="form-control"
                id="leader"
                placeholder="Enter Party Leader"
                value={this.state.party.leader}
                onChange={(e) =>
                  this.setState({
                    party: {
                      ...this.state.party,
                      leader: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="form-group">
              <div className="alert-danger">{this.state.error.symbolError}</div>
              <input
                type="text"
                className="form-control"
                id="symbol"
                placeholder="Enter Party Symbol"
                value={this.state.party.symbol}
                onChange={(e) =>
                  this.setState({
                    party: {
                      ...this.state.party,
                      symbol: e.target.value,
                    },
                  })
                }
                readOnly={this.state.id != 0 ? true : false}
              />
            </div>
            {this.state.id != 0 ? (
              <button
                className="btn btn-dark mr-2"
                onClick={(e) => {
                  e.preventDefault();
                  let isValid = this.validateForm();
                  if (!isValid) {
                    return false;
                  }
                  this.service
                    .updateParty(
                      this.state.party.regId,
                      this.state.party.leader
                    )
                    .then((result) => {
                      alert("Successful Updation");
                      this.props.history.push(
                        `/admin/party/viewParty${this.state.party.regId}`
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
                    .addParty(this.state.party)
                    .then((result) => {
                      alert(result.data);
                      this.props.history.push(
                        `/admin/party/viewParty/${this.state.party.regId}`
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
                this.props.history.push("/admin/party/viewParty");
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
export default AddParty;
