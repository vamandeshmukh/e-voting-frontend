import React, { Component } from "react";
import AdminService from "../../service/AdminService";
import Header from "../common/Header";

class DeleteParty extends Component {
  service = new AdminService();

  componentDidMount() {
    if (sessionStorage.getItem("admin")) {
      let regId = this.props.match.params.id;
      if (window.confirm("delete record?")) {
        this.service
          .deletePartyById(regId)
          .then((result) => {
            alert(result.data);
            this.props.history.push(`/admin/party/viewParty`);
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
        <p>Deleting Party...</p>
      </div>
    );
  }
}
export default DeleteParty;
