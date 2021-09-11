import React from "react";
import AdminService from "../../service/AdminService";
import Header from "../common/Header";

class DeleteElection extends React.Component {
  service = new AdminService();

  componentDidMount() {
    if (sessionStorage.getItem("admin")) {
      let electionId = this.props.match.params.id;
      if (window.confirm("Are you sure you want to delete this record?")) {
        this.service
          .deleteElection(electionId)
          .then((result) => {
            alert(result.data);
            this.props.history.push(`/admin/election/viewElection`);
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    } else {
      this.props.history.push("/login/admin");
      alert("Unauthorized Access Denied");
    }
  }

  render() {
    return (
      <div>
        <Header user="admin" />
        <p>Deleting Election...</p>
      </div>
    );
  }
}

export default DeleteElection;
