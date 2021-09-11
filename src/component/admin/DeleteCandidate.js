import React from "react";
import AdminService from "../../service/AdminService";
import Header from "../common/Header";

class DeleteCandidate extends React.Component {
  service = new AdminService();

  componentDidMount() {
    if (sessionStorage.getItem("admin")) {
      let candidateId = this.props.match.params.id;
      if (window.confirm("delete record?")) {
        this.service
          .deleteCandidateById(candidateId)
          .then((result) => {
            alert(result.data);
            this.props.history.push(`/admin/candidates/viewCandidates`);
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
        <p>Deleting Candidate...</p>
      </div>
    );
  }
}

export default DeleteCandidate;
