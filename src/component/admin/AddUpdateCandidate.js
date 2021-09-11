import React from "react";
import Candidates from "../../model/Candidates";
import AdminService from "../../service/AdminService";
import "../Home.css";
import Header from "../common/Header";

class AddUpdateCandidate extends React.Component {
  service = new AdminService();
  constructor() {
    super();
    this.state = {
      candidate: new Candidates(),
      error: {},
      party: [],
      constituency: [],
    };
  }

  validateForm() {
    let flag = true;
    let error = {};

    var namePattern = new RegExp(/^[a-zA-Z ]+$/);
    if (!this.state.candidate.candidateName) {
      error.nameError = "Candidate Name is Required";
      flag = false;
    } else if (!namePattern.test(this.state.candidate.candidateName)) {
      error.nameError = "Name should contain alphabates only";
      flag = false;
    }

    if (!this.state.candidate.partyRegId) {
      flag = false;
      error.partRegIdError = "Party Reg Id  is Required";
    }

    var constituencyIdPattern = new RegExp(/^[0-9\b]+$/);
    if (!this.state.candidate.constituencyId) {
      flag = false;
      error.constituencyError = "Constituency Id is Required";
    } else if (
      !constituencyIdPattern.test(this.state.candidate.constituencyId)
    ) {
      error.constituencyError = "Constituency Id Is not valid";
      flag = true;
    }
    this.setState({ error: error });
    return flag;
  }

  componentDidMount() {
    if (sessionStorage.getItem("admin")) {
      this.service
        .getAllParty()
        .then((result) => {
          this.setState({ party: result.data });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
      this.service
        .getAllConstituency()
        .then((result) => {
          this.setState({ constituency: result.data });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
      if (this.props.match.params.id > 0) {
        this.service
          .getCandidateById(this.props.match.params.id)
          .then((result) => {
            this.setState({ candidate: result.data });
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

  render() {
    return (
      <>
        <Header user="admin" />
        <div className="container">
          <form>
            <h1>
              <span className="badge badge-dark">
                {this.state.candidate.candidateId > 0 ? "Update " : "Add "}
                Candidate
              </span>
            </h1>

            {this.state.candidate.candidateId > 0 ? (
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  value={this.state.candidate.candidateId}
                  readOnly
                />
              </div>
            ) : null}

            <div className="form-group">
              <div className="alert-danger">{this.state.error.nameError}</div>
              <input
                className="form-control"
                type="text"
                id="candidateName"
                placeholder="Enter Candidate Name"
                value={this.state.candidate.candidateName}
                onChange={(e) => {
                  this.setState({
                    candidate: {
                      ...this.state.candidate,
                      candidateName: e.target.value,
                    },
                  });
                }}
              />
            </div>

            <div className="form-group">
              <div className="alert-danger">
                {this.state.error.partRegIdError}
              </div>
              <select
                className="form-control mb-3"
                id="partyRegId"
                value={this.state.candidate.partyRegId}
                disabled={this.state.candidate.candidateId > 0 ? true : false}
                onChange={(e) => {
                  this.setState({
                    candidate: {
                      ...this.state.candidate,
                      partyRegId: e.target.value,
                    },
                  });
                }}
              >
                <option value="" disabled selected hidden>
                  Select Party Reg Id
                </option>
                {this.state.party.map((item) => (
                  <option value={item.regId}>{item.partyName}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <div className="alert-danger">
                {this.state.error.constituencyError}
              </div>
              <select
                className="form-control mb-3"
                id="constituencyId"
                value={this.state.candidate.constituencyId}
                disabled={this.state.candidate.candidateId > 0 ? true : false}
                onChange={(e) => {
                  this.setState({
                    candidate: {
                      ...this.state.candidate,
                      constituencyId: e.target.value,
                    },
                  });
                }}
              >
                <option value="" disabled selected hidden>
                  Select ConstituencyId
                </option>
                {this.state.constituency.map((item) => (
                  <option value={item.constituencyId}>
                    {item.constituencyName}
                  </option>
                ))}
              </select>
            </div>
            {this.state.candidate.candidateId > 0 ? (
              <button
                className="btn btn-dark mr-2"
                onClick={(e) => {
                  e.preventDefault();
                  let isValid = this.validateForm();
                  if (!isValid) {
                    return false;
                  }
                  this.service
                    .updateCandidate(
                      this.state.candidate.candidateId,
                      this.state.candidate.candidateName
                    )
                    .then((result) => {
                      alert("Successful Updation");
                      this.props.history.push(
                        `/admin/candidates/viewCandidates/${this.state.candidate.candidateId}`
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
                    .addCandidate(this.state.candidate)
                    .then((result) => {
                      alert(result.data);
                      this.props.history.push(
                        `/admin/candidates/viewCandidates/${this.state.candidate.candidateId}`
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
                this.props.history.push("/admin/candidates/viewCandidates");
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

export default AddUpdateCandidate;
