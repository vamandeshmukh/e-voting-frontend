import React from "react";
import AdminService from "../../service/AdminService";
import EoService from "../../service/EoService";
import "../Home.css";
import Header from "../common/Header";

class ViewVoterByEpic extends React.Component {
  service = new AdminService();

  eoservice = new EoService();
  constructor() {
    super();
    this.state = {
      voter: {},
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("admin")) {
      this.service
        .getVoterByEpic(this.props.match.params.id)
        .then((result) => {
          this.setState({ voter: result.data });
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
            <span className="badge badge-dark">View Voter</span>
          </h1>
          <table className="table table-bordered">
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
          </table>

          <div className="form-group">
            <button
              className="btn btn-dark mr-5"
              onClick={() => this.props.history.push("/admin/voter/viewVoterAdmin")}
            >
              Back
            </button>
            {this.state.voter.status != "deactivated" &&
            this.state.voter.status != "approved" ? (
              <button
                className="btn btn-success mr-5"
                onClick={() => {
                  this.setState({
                    voter: { ...this.state.voter, status: "Approved" },
                  });
                  this.service.updateVoterStatus(this.state.voter.epic);
                }}
              >
                Accept
              </button>
            ) : // <button className='btn btn-danger mr-5' onClick={() => {
            //   this.setState({voter:{...this.state.voter,status:'Rejected'}});
            //   this.eoservice.updateVoterStatus(`reject`,this.state.voter.aadhaarId)
            // }}>Reject</button>
            null}
          </div>
        </div>
      </>
    );
  }
}

export default ViewVoterByEpic;
