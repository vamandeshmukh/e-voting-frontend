import React from "react";
import VoterService from "../../service/VoterService";
import "../Home.css";
import Header from "../common/Header";

class ViewElectionSchedule extends React.Component {
  service = new VoterService();

  constructor() {
    super();
    this.state = {
      election: [],
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("voter")) {
      this.service
        .getElectionSchedule()
        .then((result) => {
          this.setState({ election: result.data });
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
            <span className="badge badge-dark">View Election Schedule</span>
          </h1>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Election Id</th>
                <th>Election Name</th>
                <th>Election Type</th>
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
        </div>
      </>
    );
  }
}

export default ViewElectionSchedule;
