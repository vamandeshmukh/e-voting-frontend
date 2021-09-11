import React from "react";
import VoterService from "../../service/VoterService";
import EoService from "../../service/EoService";
import "../Home.css";
import Header from "../common/Header";

class ViewVoterByAadhaar extends React.Component {
  voterService = new VoterService();
  eoService = new EoService();

  constructor(props) {
    super(props);
    this.state = {
      voter: {},
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("eo")) {
      this.voterService
        .getVoterByAadhaar(this.props.match.params.id)
        .then((result) => {
          this.setState({ voter: result.data });
        })
        .catch((error) => {
          alert(error.response.data.message);
          this.props.history.push("/viewVotersEo");
        });
    } else {
      this.props.history.push("/login/eo");
      alert("Unauthorized Access Denied");
    }
  }

  render() {
    return (
      <>
        <Header user="eo" />
        <div className="container scrollable">
          <h1>
            <span className="badge badge-dark">View Voter</span>
          </h1>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Aadhaar Id</th>
                <td>{this.state.voter.aadhaarId}</td>
              </tr>
              <tr>
                <th>Voter First Name</th>
                <td>{this.state.voter.voterFirstName}</td>
              </tr>
              <tr>
                <th>Voter Middle Name</th>
                <td>{this.state.voter.voterMiddleName}</td>
              </tr>
              <tr>
                <th>Voter Last Name</th>
                <td>{this.state.voter.voterLastName}</td>
              </tr>
              <tr>
                <th>DOB</th>
                <td>{this.state.voter.dob}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{this.state.voter.gender}</td>
              </tr>
              <tr>
                <th>House No</th>
                <td>{this.state.voter.houseNo}</td>
              </tr>
              <tr>
                <th>Street</th>
                <td>{this.state.voter.street}</td>
              </tr>
              <tr>
                <th>Locality</th>
                <td>{this.state.voter.locality}</td>
              </tr>
              <tr>
                <th>City</th>
                <td>{this.state.voter.city}</td>
              </tr>
              <tr>
                <th>District</th>
                <td>{this.state.voter.district}</td>
              </tr>
              <tr>
                <th>State</th>
                <td>{this.state.voter.state}</td>
              </tr>
              <tr>
                <th>Pincode</th>
                <td>{this.state.voter.pincode}</td>
              </tr>
              <tr>
                <th>Mobile No</th>
                <td>{this.state.voter.mobile}</td>
              </tr>
              <tr>
                <th>Voter Email</th>
                <td>{this.state.voter.voterEmail}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{this.state.voter.status}</td>
              </tr>
              <tr>
                <th>Constituency Id</th>
                <td>{this.state.voter.constituencyId}</td>
              </tr>
            </tbody>
          </table>

          <div className="form-group">
            {this.state.voter.status != "deactivated" &&
            this.state.voter.status != "approved" ? (
              <>
                {this.state.voter.status != "validated" ? (
                  <button
                    className="btn btn-success mr-5"
                    onClick={() => {
                      this.setState({
                        voter: { ...this.state.voter, status: "validated" },
                      });
                      this.eoService.updateVoterStatus(
                        `accept`,
                        this.state.voter.aadhaarId
                      );
                    }}
                  >
                    Accept
                  </button>
                ) : null}
                {this.state.voter.status != "rejected" ? (
                  <button
                    className="btn btn-danger mr-5"
                    onClick={() => {
                      this.setState({
                        voter: { ...this.state.voter, status: "rejected" },
                      });
                      this.eoservice.updateVoterStatus(
                        `reject`,
                        this.state.voter.aadhaarId
                      );
                    }}
                  >
                    Reject
                  </button>
                ) : null}
              </>
            ) : null}
            {this.state.voter.status == "approved" ? (
              <button
                className="btn btn-warning mr-5"
                onClick={() => {
                  this.setState({
                    voter: { ...this.state.voter, status: "Deactivated" },
                  });
                  this.eoService.updateVoterStatus(
                    `deactivate`,
                    this.state.voter.aadhaarId
                  );
                }}
              >
                Deactivate
              </button>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

export default ViewVoterByAadhaar;
