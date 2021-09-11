import React from "react";
import VoterService from "../../service/VoterService";
import AdminService from "../../service/AdminService";
import "../Home.css";
import Header from "../common/Header";

class ViewResults extends React.Component {
  service = new VoterService();
  adminService = new AdminService();

  constructor() {
    super();
    this.state = {
      candidate: "",
      constituency: [],
      dropDownValue: "",
      inputText: "",
      result: "",
    };
  }

  componentDidMount() {
    this.adminService
      .getAllConstituency()
      .then((result) => {
        this.setState({ constituency: result.data });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  render() {
    return (
      <>
        <Header user="voter" />
        <div className="container scrollable">
          <div class="row">
            <div className="col-8">
              <h1>
                <span className="badge badge-dark">View Results</span>
              </h1>
            </div>
            <div className="col-3">
              <div className="form-group">
                <select
                  className="form-control"
                  id="dropdown"
                  onChange={(e) => {
                    this.setState({ dropDownValue: e.target.value });
                  }}
                >
                  <option value="" disabled selected hidden>
                    Find By?
                  </option>
                  <option value="Candidates">Candidate Vote Count</option>
                  <option value="Party">Party Vote Count</option>
                  <option value="Constituency">Constituency</option>
                </select>
                {this.state.dropDownValue === "Constituency" ? (
                  <select
                    className="form-control"
                    id="constituency"
                    onChange={(e) => {
                      this.setState({ inputText: e.target.value });
                    }}
                  >
                    <option value="" disabled selected hidden>
                      Find By?
                    </option>
                    {this.state.constituency.map((item) => (
                      <option value={item.constituencyId}>
                        {item.constituencyName}
                      </option>
                    ))}
                  </select>
                ) : null}
              </div>
            </div>
            <div className="col-1">
              <button
                className="btn btn-dark"
                onClick={() => {
                  if (
                    this.state.dropDownValue === "" ||
                    this.state.inputText === ""
                  ) {
                    alert("Select the kind of result you want to view.");
                  } else {
                    if (this.state.dropDownValue === "Candidates") {
                      this.service
                        .getVoteForAllCandidates()
                        .then((result) => {
                          this.setState({ result: result.data });
                        })
                        .catch((error) => {
                          alert(error.response.data.message);
                        });
                    } else if (this.state.dropDownValue === "Party") {
                      this.service
                        .getVoteForAllParty()
                        .then((result) => {
                          this.setState({ result: result.data });
                        })
                        .catch((error) => {
                          alert(error.response.data.message);
                        });
                    } else if (this.state.dropDownValue === "Constituency") {
                      this.service
                        .getVoteForConstituency(this.state.inputText)
                        .then((result) => {
                          this.setState({ result: result.data });
                        })
                        .catch((error) => {
                          alert(error.response.data.message);
                        });
                    }
                  }
                }}
              >
                View
              </button>
            </div>
          </div>

          {this.state.result.split(".").map((item) =>
            item.length > 1 ? (
              <ul>
                <li>{item}.</li>
              </ul>
            ) : null
          )}
        </div>
      </>
    );
  }
}

export default ViewResults;
