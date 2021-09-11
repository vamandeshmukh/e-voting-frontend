import React from "react";
import AdminService from "../../service/AdminService";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "../Home.css";
import Header from "../common/Header";

class ViewAllConstituency extends React.Component {
  service = new AdminService();

  constructor() {
    super();
    this.state = {
      constituency: [],
      inputText: "",
      dropDownValue: "",
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("admin")) {
      this.service
        .getAllConstituency()
        .then((result) => {
          this.setState({ constituency: result.data });
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
                <span className="badge badge-dark">Constituencies</span>
              </h1>
              <button
                className="btn btn-outline-dark ml-3 mb-3 "
                onClick={() =>
                  this.props.history.push(
                    `/admin/constituency/addConstituency/0`
                  )
                }
              >
                <i class="icon-plus" /> Add Constituency
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
                        .getAllConstituency()
                        .then((result) => {
                          this.setState({ constituency: result.data });
                        })
                        .catch((error) => {
                          alert(error.response.data.message);
                        });
                    } else {
                      if (this.state.dropDownValue === "ById") {
                        this.service
                          .getConstituencyById(this.state.inputText)
                          .then((result) => {
                            this.setState({ constituency: [result.data] });
                          })
                          .catch((error) => {
                            alert(error.response.data.message);
                          });
                      }
                      if (this.state.dropDownValue === "ByName") {
                        this.service
                          .getConstituencyByName(this.state.inputText)
                          .then((result) => {
                            this.setState({ constituency: [result.data] });
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
                  id="constituency"
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

          {this.state.constituency.length > 0 ? (
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Constituency Id</th>
                  <th>Constituency Name</th>
                  <th>State</th>
                  <th>Election Id</th>
                </tr>
              </thead>
              <tbody>
                {this.state.constituency.map((c) => (
                  <tr
                    key={c.constituencyId}
                    onClick={() =>
                      this.props.history.push(
                        `/admin/constituency/viewConstituency/${c.constituencyId}`
                      )
                    }
                  >
                    <td>{c.constituencyId}</td>
                    <td>{c.constituencyName}</td>
                    <td>{c.state}</td>
                    <td>{c.electionId}</td>
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

export default ViewAllConstituency;
