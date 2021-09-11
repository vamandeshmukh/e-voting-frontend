import React from "react";
import AdminService from "../../service/AdminService";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "../Home.css";
import Header from "../common/Header";

class ViewAllCandidates extends React.Component {
  service = new AdminService();

  constructor() {
    super();
    this.state = {
      candidate: [],
      inputText: "",
      dropDownValue: "",
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("admin")) {
      this.service
        .getAllCandidates()
        .then((result) => {
          this.setState({ candidate: result.data });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } else {
      this.props.history.push("/login/admin");
      alert("Unauthorized Access Denied");
    }
  }

  render() {
    return (
      <>
        <Header user="admin" />
        <div className="container scrollable">
          <div className="row">
            <div className="col-8">
              <ArrowBackIosIcon
                onClick={() => this.props.history.push("/admin/dashboard")}
              />
              <h1 className="bdg">
                <span className="badge badge-dark">Candidates</span>
              </h1>
              <button
                className="btn btn-outline-dark ml-3 mb-3 "
                onClick={() =>
                  this.props.history.push(`/admin/candidates/addCandidate/0`)
                }
              >
                <i class="icon-plus" /> Add Candidate
              </button>
            </div>

            <div className=" col-4 mt-1 bdg">
              <div className="input-group">
                <input
                  type="search"
                  placeholder="Search..."
                  className="form-control"
                  value={this.state.inputText}
                  onChange={(e) => {
                    this.setState({ inputText: e.target.value });
                  }}
                />
                <div className="input-group-append"></div>
                <button
                  className="btn btn-dark"
                  onClick={(e) => {
                    e.preventDefault();

                    if (
                      this.state.inputText == "" ||
                      this.state.dropDownValue == ""
                    ) {
                      this.service
                        .getAllCandidates()
                        .then((result) => {
                          this.setState({ candidate: result.data });
                        })
                        .catch((error) => {
                          alert(error.response.data.message);
                        });
                    } else {
                      if (this.state.dropDownValue == "ByName") {
                        this.service
                          .getCandidateByName(this.state.inputText)
                          .then((result) => {
                            this.setState({ candidate: [result.data] });
                          })
                          .catch((error) => {
                            alert(error.response.data.message);
                          });
                      }

                      if (this.state.dropDownValue == "ById") {
                        this.service
                          .getCandidateById(this.state.inputText)
                          .then((result) => {
                            this.setState({ candidate: [result.data] });
                          })
                          .catch((error) => {
                            alert(error.response.data.message);
                          });
                      }
                    }
                  }}
                >
                  Search
                </button>
                <select
                  className="form-select"
                  id="candidates"
                  onChange={(e) => {
                    this.setState({ dropDownValue: e.target.value });
                  }}
                >
                  <option defaultValue="true" hidden>
                    Find By?
                  </option>
                  <option value="ByName">ByName</option>
                  <option value="ById">ById</option>
                </select>
              </div>
            </div>
          </div>

          {this.state.candidate.length > 0 ? (
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Candidate Id</th>
                  <th>Candidate Name</th>
                  <th>Part Reg Id</th>
                  <th>Constituency Id</th>
                </tr>
              </thead>
              <tbody>
                {this.state.candidate.map((c) => (
                  <tr
                    key={c.candidateId}
                    onClick={() =>
                      this.props.history.push(
                        `/admin/candidates/viewCandidates/${c.candidateId}`
                      )
                    }
                  >
                    <td>{c.candidateId}</td>
                    <td>{c.candidateName}</td>
                    <td>{c.partyRegId}</td>
                    <td>{c.constituencyId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "No Records Present"
          )}
        </div>
      </>
    );
  }
}

export default ViewAllCandidates;
