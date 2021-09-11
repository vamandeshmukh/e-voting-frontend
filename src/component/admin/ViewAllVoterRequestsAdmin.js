import React from "react";
import AdminService from "../../service/AdminService";
import "../Home.css";
import Header from "../common/Header";

class ViewAllVoterRequestsAdmin extends React.Component {
  service = new AdminService();

  constructor() {
    super();
    this.state = {
      voterRequests: [],
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("admin")) {
      this.service
        .getAllVoterRequests()
        .then((result) => {
          this.setState({ voterRequests: result.data });
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
            <span className="badge badge-dark">View Voter Requests</span>
          </h1>
          <div className="table table-bordered table-hover">
            {this.state.voterRequests.length > 0 ? (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>AadhaarId</th>
                    <th>Epic</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Last Name</th>
                    <th>DOB</th>
                    <th>Status</th>
                    <th>Constituency Id</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.voterRequests.map((v) => (
                    <tr
                      key={v.aadhaarId}
                      onClick={() =>
                        this.props.history.push(
                          `/admin/voter/viewVoterEpic/${v.epic}`
                        )
                      }
                    >
                      <td>{v.aadhaarId}</td>
                      <td>{v.epic}</td>
                      <td>{v.voterFirstName}</td>
                      <td>{v.voterMiddleName}</td>
                      <td>{v.voterLastName}</td>
                      <td>{v.dob}</td>
                      <td>{v.status}</td>
                      <td>{v.constituencyId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No Voter Present</div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default ViewAllVoterRequestsAdmin;
