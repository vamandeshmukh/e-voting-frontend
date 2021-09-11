import React from "react";
import AdminService from "../../service/AdminService";
import "../Home.css";
import Header from "../common/Header";

class ViewCandidates extends React.Component {
  service = new AdminService();

  constructor() {
    super();
    this.state = {
      candidate: {},
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("admin")) {
      this.service
        .getCandidateById(this.props.match.params.id)
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
          <h1>
            <span className="badge badge-dark">View Candidate</span>
          </h1>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Candidate Id</th>
                <td>{this.state.candidate.candidateId}</td>
              </tr>
              <tr>
                <th>Candidate Name</th>
                <td>{this.state.candidate.candidateName}</td>
              </tr>
              <tr>
                <th>Party Reg Id</th>
                <td>{this.state.candidate.partyRegId}</td>
              </tr>
              <tr>
                <th>Constituency Id</th>
                <td>{this.state.candidate.constituencyId}</td>
              </tr>
            </tbody>
          </table>

          <div className="form-group">
            <button
              className="btn btn-dark mr-5"
              onClick={() => {
                this.props.history.push(
                  `/admin/candidates/updateCandidate/${this.state.candidate.candidateId}`
                );
              }}
            >
              <i class="icon-pencil" /> Update
            </button>
            <button
              className="btn btn-dark mr-5"
              onClick={() => {
                this.props.history.push(
                  `/admin/candidates/deleteCandidate/${this.state.candidate.candidateId}`
                );
              }}
            >
              <i class="icon-trash" /> Delete
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ViewCandidates;
