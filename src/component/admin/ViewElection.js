import React from "react";
import AdminService from "../../service/AdminService";
import "../Home.css";
import Header from "../common/Header";

class ViewElection extends React.Component {
  service = new AdminService();

  constructor() {
    super();
    this.state = {
      election: {},
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("admin")) {
      this.service
        .getElectionById(this.props.match.params.id)
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
        <div className="container">
          <h1>
            <span className="badge badge-dark">View Election</span>
          </h1>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Election Id</td>
                <th>{this.state.election.electionId}</th>
              </tr>
              <tr>
                <td>Election Name</td>
                <th>{this.state.election.electionName}</th>
              </tr>
              <tr>
                <td>Election State</td>
                <th>{this.state.election.electionType}</th>
              </tr>
              <tr>
                <td>Election Date</td>
                <th>{this.state.election.electionDate}</th>
              </tr>
            </tbody>
          </table>

          <div className="form-group">
            <button
              className="btn btn-dark mr-5"
              onClick={() => {
                this.props.history.push(
                  `/admin/election/updateElection/${this.state.election.electionId}`
                );
              }}
            >
              <i class="icon-pencil" /> Update
            </button>
            <button
              className="btn btn-dark mr-5"
              onClick={() =>
                this.props.history.push(
                  `/admin/election/deleteElection/${this.state.election.electionId}`
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

export default ViewElection;
