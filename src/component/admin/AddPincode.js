import React from "react";
import allStates from "../common/StateList";
import Pincode from "../../model/Pincode";
import AdminService from "../../service/AdminService";
import "../Home.css";
import Header from "../common/Header";

class AddPincode extends React.Component {
  service = new AdminService();

  constructor() {
    super();
    this.state = {
      pincode: new Pincode(),
      error: {},
      constituency: [],
    };
  }

  componentDidMount() {
    if (!sessionStorage.getItem("admin")) {
      this.props.history.push("/login/admin");
      alert("Unauthorized Access Denied");
    } else {
      this.service
        .getAllConstituency()
        .then((result) => {
          this.setState({ constituency: result.data });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  }

  validateForm() {
    let flag = true;
    let error = {};
    var pincodePattern = new RegExp(/^[0-9\b]+$/);
    if (!this.state.pincode.pincode) {
      error.pincodeError = "Pincode is Required";
      flag = false;
    } else if (this.state.pincode.pincode.length !== 6) {
      error.pincodeError = "Invalid Pincode";
      flag = false;
    } else if (!pincodePattern.test(this.state.pincode.pincode)) {
      error.pincodeError = "Invalid Pincode";
      flag = false;
    }
    var constituencyIdPattern = new RegExp(/^[0-9\b]+$/);
    if (!this.state.pincode.constituencyId) {
      error.constituencyIdError = "ConstituencyId is Required";
      flag = false;
    } else if (!constituencyIdPattern.test(this.state.pincode.constituencyId)) {
      error.constituencyIdError = "Invalid Constituency Id";
      flag = false;
    }
    var namePattern = new RegExp(/^[a-zA-Z ]+$/);
    if (!this.state.pincode.constituencyName) {
      error.constituencyNameError = "Constituency Name is Required";
      flag = false;
    } else if (!namePattern.test(this.state.pincode.constituencyName)) {
      error.constituencyNameError = "Invalid Constituency Name";
      flag = false;
    }
    if (!this.state.pincode.state) {
      error.stateError = "State is Required";
      flag = false;
    } else if (!namePattern.test(this.state.pincode.state)) {
      error.stateError = "Invalid State ";
      flag = false;
    }
    this.setState({ error: error });
    return flag;
  }

  render() {
    return (
      <>
        <Header user="admin" />
        <div className="container">
          <form>
            <h1>
              <span className="badge badge-dark">Add Pincode</span>
            </h1>
            <div className="form-group">
              <div className="alert-danger">
                {this.state.error.pincodeError}
              </div>
              <input
                className="form-control"
                type="text"
                id="pincode"
                placeholder="Enter Pincode"
                value={this.state.pincode.pincode}
                onChange={(e) => {
                  this.setState({
                    pincode: {
                      ...this.state.pincode,
                      pincode: e.target.value,
                    },
                  });
                }}
              />
            </div>

            <div className="form-group">
              <div className="alert-danger">
                {this.state.error.constituencyNameError}
              </div>
              <select
                className="form-control mb-3"
                id="constituencyName"
                value={
                  this.state.pincode.constituencyId +
                  "-" +
                  this.state.pincode.constituencyName
                }
                onChange={(e) => {
                  let constituency = e.target.value.split("-");
                  this.setState({
                    pincode: {
                      ...this.state.pincode,                      
                      constituencyId: constituency[0],
                      constituencyName: constituency[1],
                    },
                  });
                }}
              >
                <option value="-" disabled selected hidden>
                  Select Constituency
                </option>
                {this.state.constituency.map((item) => (
                  <option
                    value={item.constituencyId + "-" + item.constituencyName}
                  >
                    {item.constituencyName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <div className="alert-danger">{this.state.error.stateError}</div>
              <select
                className="form-control mb-3"
                id="state"
                value={this.state.pincode.state}
                onChange={(e) =>
                  this.setState({
                    pincode: {
                      ...this.state.pincode,
                      state: e.target.value,
                    },
                  })
                }
              >
                <option value="" disabled selected hidden>
                  Select State
                </option>
                {allStates.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-dark"
              onClick={(e) => {
                e.preventDefault();
                let isValid = this.validateForm();
                if (!isValid) {
                  return false;
                }
                this.service
                  .addPincode(this.state.pincode)
                  .then((result) => {
                    alert(result.data);
                    this.props.history.push(`/admin/dashboard`);
                  })
                  .catch((error) => {
                    alert(error.response.data.message);
                  });
              }}
            >
              <i class="icon-plus" /> Add
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default AddPincode;
