import AdminService from "../../service/AdminService";
import React from "react";
import Header from "../common/Header";

class DeleteConstituency extends React.Component {
  service = new AdminService();

  componentDidMount() {
    if (sessionStorage.getItem("admin")) {
      let constituencyId = this.props.match.params.id;
      if (window.confirm("delete record?")) {
        this.service
          .deleteConstituencyById(constituencyId)
          .then((result) => {
            alert(result.data);
            this.props.history.push(`/admin/constituency/viewConstituency`);
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
        <p>Deleting Constituency...</p>
      </div>
    );
  }
}
export default DeleteConstituency;
