import React from "react";
import AdminService from "../../service/AdminService";
import "../Home.css";
import Header from "../common/Header";

class ViewConstituency extends React.Component {
  service = new AdminService();

  constructor() {
    super();
    this.state = {
      constituency: {},
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("admin")) {
      this.service
        .getConstituencyById(this.props.match.params.id)
        .then((result) => {
          this.setState({ constituency: result.data });
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
            <span className="badge badge-dark">VIEW CONSTITUENCY</span>
          </h1>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Constituency Id</th>
                <td>{this.state.constituency.constituencyId}</td>
              </tr>
              <tr>
                <th>Constituency Name</th>
                <td>{this.state.constituency.constituencyName}</td>
              </tr>
              <tr>
                <th>State</th>
                <td>{this.state.constituency.state}</td>
              </tr>
              <tr>
                <th>Election Id</th>
                <td>{this.state.constituency.electionId}</td>
              </tr>
            </tbody>
          </table>
          <div className="form-group">
            <button
              className="btn btn-dark mr-5 "
              onClick={() => {
                this.props.history.push(
                  `/admin/constituency/updateConstituency/${this.state.constituency.constituencyId}`
                );
              }}
            >
              <i class="icon-pencil" /> Update
            </button>
            <button
              className="btn btn-dark mr-5"
              onClick={() => {
                this.props.history.push(
                  `/admin/constituency/deleteConstituency/${this.state.constituency.constituencyId}`
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

export default ViewConstituency;
