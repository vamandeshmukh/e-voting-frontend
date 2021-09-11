import React from "react";
import AdminService from "../../service/AdminService";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "../Home.css";
import Header from "../common/Header";

class ViewAllParty extends React.Component {
  service = new AdminService();

  constructor() {
    super();
    this.state = {
      party: [],
      inputText: "",
      dropDownValue: "",
    };
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
                <span className="badge badge-dark">Parties</span>
              </h1>
              <button
                className="btn btn-outline-dark ml-3 mb-3 "
                onClick={() =>
                  this.props.history.push(`/admin/party/addParty/0`)
                }
              >
                <i class="icon-plus" /> Add Party
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
                <div className="input-group-append">
                  <button
                    className="btn btn-dark"
                    onClick={(e) => {
                      e.preventDefault();

                      if (
                        this.state.inputText == "" ||
                        this.state.dropDownValue == ""
                      ) {
                        this.service
                          .getAllParty()
                          .then((result) => {
                            this.setState({ party: result.data });
                          })
                          .catch((error) => {
                            alert(error.response.data.message);
                          });
                      } else {
                        if (this.state.dropDownValue === "ByRegId") {
                          this.service
                            .getPartyById(this.state.inputText)
                            .then((result) => {
                              this.setState({ party: [result.data] });
                            })
                            .catch((error) => {
                              alert(error.response.data.message);
                            });
                        }
                        if (this.state.dropDownValue === "ByName") {
                          this.service
                            .getPartyByName(this.state.inputText)
                            .then((result) => {
                              this.setState({ party: [result.data] });
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
                    className="form-control"
                    id="party"
                    onChange={(e) => {
                      this.setState({ dropDownValue: e.target.value });
                    }}
                  >
                    <option defaultValue="true" hidden>
                      Find By?
                    </option>
                    <option value="ByName">ByName</option>
                    <option value="ByRegId">ByRegId</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {this.state.party.length > 0 ? (
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Registration Id</th>
                  <th>Party Name</th>
                  <th>Symbol</th>
                  <th>Leader</th>
                </tr>
              </thead>
              <tbody>
                {this.state.party.map((p) => (
                  <tr
                    key={p.regId}
                    onClick={() =>
                      this.props.history.push(`viewParty/${p.regId}`)
                    }
                  >
                    <td>{p.regId}</td>
                    <td>{p.partyName}</td>
                    <td>{p.symbol}</td>
                    <td>{p.leader}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "No Records Found"
          )}
        </div>
      </>
    );
  }
}

export default ViewAllParty;
