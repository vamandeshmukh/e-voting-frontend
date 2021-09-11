import React from "react";
import AdminService from "../../service/AdminService";
import "../Home.css";
import Header from "../common/Header";

class ViewParty extends React.Component {
  service = new AdminService();

  constructor() {
    super();
    this.state = {
      party: {},
      candidates: [],
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("admin")) {
      this.service
        .getPartyById(this.props.match.params.id)
        .then((result) => {
          this.setState({ party: result.data });
          this.service
            .getCandidatesByParty(this.props.match.params.id)
            .then((result) => {
              this.setState({ candidates: result.data });
            })
            .catch((error) => {
              alert(error.response.data.message);
            });
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
          <h1>
            <span className="badge badge-dark">View Party</span>
          </h1>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Party Reg. Id</th>
                <td>{this.state.party.regId}</td>
              </tr>
              <tr>
                <th>Party Name</th>
                <td>{this.state.party.partyName}</td>
              </tr>
              <tr>
                <th>Leader</th>
                <td>{this.state.party.leader}</td>
              </tr>
            </tbody>
          </table>
          {this.state.candidates.length > 0 ? (
            <table className="table table-bordered table-hover">
              <thead>
                <th>CandidateId</th>
                <th>Candidate Name</th>
                <th>ConstituencyId</th>
              </thead>
              <tbody>
                {this.state.candidates.map((c) => (
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
                    <td>{c.constituencyId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
          <div className="form-group">
            <button
              className="btn btn-dark mr-5"
              onClick={() => {
                this.props.history.push(
                  `/admin/party/updateParty/${this.state.party.regId}`
                );
              }}
            >
              <i class="icon-pencil" /> Update
            </button>
            <button
              className="btn btn-dark mr-5"
              onClick={() =>
                this.props.history.push(
                  `/admin/party/deleteParty/${this.state.party.regId}`
                )
              }
            >
              <i class="icon-trash" /> Delete
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ViewParty;
