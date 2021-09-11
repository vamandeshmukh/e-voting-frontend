import React from "react";
import VoterService from "../../service/VoterService";
import "../Home.css";
import Header from "../common/Header";

class ViewPartiesVoter extends React.Component {
  service = new VoterService();

  constructor() {
    super();
    this.state = {
      party: [],
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("voter")) {
      this.service
        .getParty()
        .then((result) => {
          this.setState({ party: result.data });
        })
        .catch((error) => {
          alert(error.response.data.messege);
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
            <span className="badge badge-dark">View Parties</span>
          </h1>
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
                <tr key={p.regId}>
                  <td>{p.regId}</td>
                  <td>{p.partyName}</td>
                  <td>{p.symbol}</td>
                  <td>{p.leader}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default ViewPartiesVoter;
