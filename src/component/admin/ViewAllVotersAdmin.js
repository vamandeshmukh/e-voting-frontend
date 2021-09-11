import React from "react";
import { Link } from "react-router-dom";
import AdminService from "../../service/AdminService";
import "../Home.css";
import Header from "../common/Header";

class ViewAllVotersAdmin extends React.Component {
  service = new AdminService();

  constructor() {
    super();
    this.state = {
      voters: [],
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("admin")) {
      this.service
        .getAllVoters()
        .then((result) => {
          this.setState({ voters: result.data });
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
          <div className="row">
            <div className="col-9">
              <h1>
                <span className="badge badge-dark">View Voters</span>
              </h1>
            </div>
            <div className="col-3">
              <Link to="/admin/voter/viewVoterRequest">
                <h5 style={{ paddingTop: "8px" }}>
                  Click here to view requests
                </h5>
              </Link>
            </div>
          </div>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
              <th>Aadhaar Id</th>
                <th>Epic </th>
                <th>Status </th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>DOB</th>
                <th>State</th>
                <th>Pincode</th>
                <th>Mobile No</th>
                <th>Constituency Id</th>
              </tr>
            </thead>
            <tbody>
              {this.state.voters.map((p) => (
                <tr
                  key={p.aadhaarId}
                  onClick={() =>
                    this.props.history.push(
                      `/admin/voter/viewVoterEpic/${p.epic}`
                    )
                  }
                >
                  <td>{p.aadhaarId}</td>
                  <td>{p.epic}</td>
                  <td>{p.status}</td>
                  <td>{p.voterFirstName}</td>
                  <td>{p.voterLastName}</td>
                  <td>{p.dob}</td>
                  <td>{p.state}</td>
                  <td>{p.pincode}</td>
                  <td>{p.mobile}</td>
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

export default ViewAllVotersAdmin;
