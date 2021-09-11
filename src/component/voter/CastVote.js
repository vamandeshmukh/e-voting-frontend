import React from "react";
import Voter from "../../model/Voter";
import Vote from "../../model/Vote";
import VoterService from "../../service/VoterService";
import "../Home.css";
import Header from "../common/Header";

class ViewCandidatesByConstituency extends React.Component {
  service = new VoterService();

  constructor() {
    super();
    this.state = {
      voter: new Voter(),
      candidates: [],
      vote: new Vote(),
      loading: false,
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("voter")) {
      this.service
        .getVoterByAadhaar(sessionStorage.getItem("voter"))
        .then((result) => {
          this.setState({ voter: result.data });
          this.setState({
            vote: { ...this.state.vote, epic: this.state.voter.epic },
          });
          this.service
            .viewCandidatesByConstituency(this.state.voter.aadhaarId)
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
      this.props.history.push("/login/voter");
      alert("Unauthorized Access Denied");
    }
  }

  render() {
    return (
      <>
        <Header user="voter" />
        <div className="container scrollable">
          <div className="row">
            <div className="col-6">
              <h1>
                <span className="badge badge-dark">Cast Your Vote</span>
              </h1>
            </div>
            <div className="col-5" style={{ paddingTop: "20px" }}>
              <b>
                {this.state.loading == true ? (
                  <>
                    <i class="icon-spinner" /> Loading...
                  </>
                ) : (
                  null
                )}
              </b>
            </div>
            <div className="col-1">
              <button
                className="btn btn-dark"
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ loading: true });
                  this.service
                    .castVote(this.state.vote)
                    .then((result) => {
                      this.setState({ loading: false });
                      alert(result.data);
                      this.props.history.push("/voter/dashboard");
                    })
                    .catch((error) => {
                      this.setState({ loading: false });
                      alert(error.response.data.message);
                      this.props.history.push("/voter/dashboard");
                    });
                }}
              >
                Cast
              </button>
            </div>
          </div>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Vote</th>
                <th>Candidate Name</th>
                <th>Party Registration Id</th>
              </tr>
            </thead>
            <tbody>
              {this.state.candidates.map((p) => (
                <tr key={p.candidateId}>
                  <td>
                    <input
                      type="radio"
                      name="vote"
                      value={p.candidateId}
                      onClick={(e) =>
                        this.setState({
                          vote: {
                            ...this.state.vote,
                            candidate: e.target.value,
                          },
                        })
                      }
                    />
                  </td>
                  <td>{p.candidateName}</td>
                  <td>{p.partyRegId}</td>
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
