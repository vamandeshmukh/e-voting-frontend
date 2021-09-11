import React from "react";
import VoterService from "../../service/VoterService";
import "../Home.css";
import Header from "../common/Header";

class ViewCandidatesVoter extends React.Component {
  service = new VoterService();

  constructor() {
    super();
    this.state = {
      candidate: [],
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("voter")) {
      this.service
        .getCandidates()
        .then((result) => {
          this.setState({ candidate: result.data });
        })
        .catch((error) => {
          alert(error.response.data.message);
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
            <span className="badge badge-dark">View Candidates</span>
          </h1>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Candidate Id</th>
                <th>Candidate Name</th>
                <th>Party Registration Id</th>
                <th>Constituency Id</th>
              </tr>
            </thead>
            <tbody>
              {this.state.candidate.map((c) => (
                <tr key={c.candidateId}>
                  <td>{c.candidateId}</td>
                  <td>{c.candidateName}</td>
                  <td>{c.partyRegId}</td>
                  <td>{c.constituencyId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default ViewCandidatesVoter;
