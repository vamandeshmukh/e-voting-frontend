import React from "react";
import VoterService from "../../service/VoterService";
import "../Home.css";
import Header from "../common/Header";

class ViewCandidatesByConstituency extends React.Component {
  service = new VoterService();

  constructor() {
    super();
    this.state = {
      candidates: [],
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("voter")) {
      this.service
        .viewCandidatesByConstituency(sessionStorage.getItem("voter"))
        .then((result) => {
          this.setState({ candidates: result.data });
        })
        .catch((error) => {
          alert(JSON.stringify(error.response.data.message));
        });
    } else {
      this.props.history.push("/login/voter");
      alert("Unauthorized Access Denied");
    }
  }

  render() {
    return (
      <>
        <Header user="voter" />
        <div className="container scrollable">
          <h1>
            <span className="badge badge-dark">
              Candidates In Your Constituency
            </span>
          </h1>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Party Registration Id</th>
                <th>Candidate Name</th>
                <th>Constituency Id</th>
              </tr>
            </thead>
            <tbody>
              {this.state.candidates.map((p) => (
                <tr key={p.candidateId}>
                  <td>{p.partyRegId}</td>
                  <td>{p.candidateName}</td>
                  <td>{p.constituencyId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default ViewCandidatesByConstituency;
