import React from "react";
import store from "../../redux/store";
import Voter from "../../model/Voter";
import "../Home.css";
import Header from "../common/Header";

class ViewVoterProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      voter: new Voter(),
    };
  }

  componentDidMount() {
    if (
      sessionStorage.getItem("voter") &&
      !(Object.keys(store.getState().voter.voter).length === 0)
    ) {
      this.setState({ voter: store.getState().voter.voter });
    } else {
      sessionStorage.removeItem("voter");
      this.props.history.push("/login/voter");
      alert("Unauthorized Access Denied Or An Unexpected Error Occured!");
    }
  }

  render() {
    return (
      <>
        <Header user="voter"/>
        <div className="container scrollable">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Aadhaar</th>
                <td>{this.state.voter.aadhaarId}</td>
              </tr>
              <tr>
                <th>epic</th>
                <td>{this.state.voter.epic}</td>
              </tr>
              <tr>
                <th>First Name</th>
                <td>{this.state.voter.voterFirstName}</td>
              </tr>
              <tr>
                <th>Middle Name</th>
                <td>{this.state.voter.voterMiddleName}</td>
              </tr>
              <tr>
                <th>Last Name</th>
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
                <th>district</th>
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
                <th>Mobile no</th>
                <td>{this.state.voter.mobile}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{this.state.voter.voterEmail}</td>
              </tr>
              <tr>
                <th>Request Status</th>
                <td>{this.state.voter.status}</td>
              </tr>
              <tr>
                <th>Constituency Id</th>
                <td>{this.state.voter.constituencyId}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
export default ViewVoterProfile;
