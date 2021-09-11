import React, { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    if (this.props.match.params.user == "admin") {
      sessionStorage.removeItem("admin");
      this.props.history.push("/login/admin");
    } else if (this.props.match.params.user == "eo") {
      sessionStorage.removeItem("eo");
      this.props.history.push("/login/eo");
    } else if (this.props.match.params.user == "voter") {
      sessionStorage.removeItem("voter");
      this.props.history.push("/login/voter");
    } else {
      alert("Oops! an error occured");
      this.props.history.push("/");
    }
  }

  render() {
    return <div className="container">Logging out...</div>;
  }
}

export default Logout;
