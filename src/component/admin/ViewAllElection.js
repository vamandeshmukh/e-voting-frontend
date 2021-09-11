import React from "react";
import AdminService from "../../service/AdminService";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "../Home.css";
import Header from "../common/Header";

class ViewAllElection extends React.Component {
  service = new AdminService();

  constructor() {
    super();
    this.state = {
      election: [],
      inputText: "",
      dropDownValue: "",
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
                <span className="badge badge-dark">Elections</span>
              </h1>
              <button
                className="btn btn-outline-dark ml-3 mb-3 "
                onClick={() =>
                  this.props.history.push(`/admin/election/addElection/0`)
                }
              >
                <i class="icon-plus" /> Add Election
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
                        .getAllElection()
                        .then((result) => {
                          this.setState({ election: result.data });
                        })
                        .catch((error) => {
                          alert(error.response.data.message);
                        });
                    } else {
                      if (this.state.dropDownValue === "ById") {
                        this.service
                          .getElectionById(this.state.inputText)
                          .then((result) => {
                            this.setState({ election: [result.data] });
                          })
                          .catch((error) => {
                            alert(error.response.data.message);
                          });
                      }
                      if (this.state.dropDownValue === "ByName") {
                        this.service
                          .getElectionByName(this.state.inputText)
                          .then((result) => {
                            this.setState({ election: result.data });
                          })
                          .catch((error) => {
                            alert(error.response.data.message);
                          });
                      }

                      if (this.state.dropDownValue === "ByType") {
                        this.service
                          .getElectionByType(this.state.inputText)
                          .then((result) => {
                            this.setState({ election: result.data });
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
                  id="election"
                  onChange={(e) => {
                    this.setState({ dropDownValue: e.target.value });
                  }}
                >
                  <option defaultValue="true" hidden>
                    Find By?
                  </option>
                  <option value="ByName">ByName</option>
                  <option value="ById">ById</option>
                  <option value="ByType">ByState</option>
                </select>
              </div>
            </div>
          </div>

          {this.state.election.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Election Id</th>
                  <th>Election Name</th>
                  <th>Election State</th>
                  <th>Election Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.election.map((e) => (
                  <tr
                    key={e.electionId}
                    onClick={() =>
                      this.props.history.push(`viewElection/${e.electionId}`)
                    }
                  >
                    <td>{e.electionId}</td>
                    <td>{e.electionName}</td>
                    <td>{e.electionType}</td>
                    <td>{e.electionDate}</td>
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

export default ViewAllElection;
