import React from "react";
import allStates from "./StateList";
import Voter from "../../model/Voter";
import VoterService from "../../service/VoterService";
import "../Home.css";
import Header from "./Header";

class VoterRegistration extends React.Component {
  service = new VoterService();

  constructor() {
    super();
    this.state = {
      voter: new Voter(),
      error: {},
    };
  }

  validateForm() {
    let flag = true;
    let error = {};

    var aadhaarPattern = new RegExp(/^[0-9\b]+$/);
    if (!this.state.voter.aadhaarId) {
      error.aadhaarError = "Aadhaar Number Is Required";
      flag = false;
    } else if (!aadhaarPattern.test(this.state.voter.aadhaarId)) {
      error.aadhaarError = "Aadhar Should Contain Only Digits";
      flag = false;
    } else if (this.state.voter.aadhaarId.length != 12) {
      error.aadhaarError = "Aadhaar Number Should Be 12 Digits";
      flag = false;
    }

    var namePattern = new RegExp(/^[a-zA-Z\b]+$/);
    if (!this.state.voter.voterFirstName) {
      error.voterFirstName = "Voter First Name Is Required";
      flag = false;
    } else if (!namePattern.test(this.state.voter.voterFirstName)) {
      error.voterFirstName = "Name Should Contain Alphabates Only";
      flag = false;
    }
    if (this.state.voter.voterMiddleName) {
      if (!namePattern.test(this.state.voter.voterMiddleName)) {
        error.voterMiddleName = "Name Should Contain Alphabates Only";
        flag = false;
      }
    }

    if (!this.state.voter.voterLastName) {
      error.voterLastName = "Voter last Name Is Required";
      flag = false;
    } else if (!namePattern.test(this.state.voter.voterLastName)) {
      error.voterLastName = "Name Should Contain Alphabates Only";
      flag = false;
    }

    var dobPattern = new RegExp(/^([0-9]{2})-([0-9]{2})-([0-9]{4})$/);
    var birth = this.state.voter.dob;
    var year = birth.substr(-4);
    var edate = new Date();
    var eyear = edate.getFullYear();
    if (!this.state.voter.dob) {
      error.dobError = "Date Of Birth Is Required";
      flag = false;
    } else if (!dobPattern.test(this.state.voter.dob)) {
      error.dobError = "Date Of Birth Is Not In Correct Format (dd-mm-yyyy)";
      flag = false;
    } else if (eyear - year < 18) {
      error.dobError = "Age Is Insufficient To Vote";
      flag = false;
    }

    if (!this.state.voter.gender) {
      error.genderError = "Gender Is Required";
      flag = false;
    }

    if (!this.state.voter.houseNo) {
      error.houseNoError = "House Number Is Required";
      flag = false;
    }

    if (!this.state.voter.street) {
      error.streetError = "Street Is Required";
      flag = false;
    }

    if (!this.state.voter.locality) {
      error.localityError = "Locality Is Required";
      flag = false;
    }

    var cityPattern = new RegExp(/^[0-9\b]+$/);
    if (!this.state.voter.city) {
      error.cityError = "City Is Required";
      flag = false;
    } else if (cityPattern.test(this.state.voter.city)) {
      error.cityError = "Enter A Valid City";
      flag = false;
    }
    var areaPattern = new RegExp(/^[a-zA-Z ]+$/);
    if (!this.state.voter.district) {
      error.districtError = "District Is Required";
      flag = false;
    } else if (!areaPattern.test(this.state.voter.district)) {
      error.districtError = "Enter A Valid District";
      flag = false;
    }

    if (!this.state.voter.state) {
      error.stateError = "State Is Required";
      flag = false;
    } else if (!areaPattern.test(this.state.voter.state)) {
      error.stateError = "Enter A Valid State";
      flag = false;
    }

    if (!this.state.voter.pincode) {
      error.pincodeError = "Pincode Is Required";
      flag = false;
    } else if (!this.state.voter.pincode.match(/^\d{6}$/)) {
      error.pincodeError = "Pincode Should Be 6 Digits";
      flag = false;
    }

    var mobilePattern = new RegExp(/^[0-9\b]+$/);
    if (!this.state.voter.mobile) {
      error.mobileNoError = "Mobile Number Is Required";
      flag = false;
    } else if (!mobilePattern.test(this.state.voter.mobile)) {
      error.mobileNoError = "Mobile Number Is Not Valid";
      flag = false;
    } else if (this.state.voter.mobile.length != 10) {
      error.mobileNoError = "Mobile Number Should Be Of 10 Digits";
      flag = false;
    }

    if (!this.state.voter.voterPassword) {
      error.passwordError = "Password Is Required";
      flag = false;
    } else if (this.state.voter.voterPassword.length > 8) {
      error.passwordError = "Password Must Not Be More Than 8 Characters";
      flag = false;
    }

    var emailPattern = new RegExp(
      /^([a-z A-Z 0-9 _\.\-])+\@(([a-z A-Z 0-9\-])+\.)+([a-z A-z 0-9]{3,3})+$/
    );
    if (!this.state.voter.voterEmail) {
      error.emailError = "Voter Email Is Required";
      flag = false;
    } else if (!emailPattern.test(this.state.voter.voterEmail)) {
      error.emailError = "Enter a Valid Email";
      flag = false;
    }

    this.setState({ error: error });
    return flag;
  }

  submitForm = (e) => {
    e.preventDefault();
    let isValid = this.validateForm();
    if (!isValid) {
      return false;
    }
    this.service
      .addVoter(this.state.voter)
      .then((result) => {
        alert(result.data);
        this.props.history.push(`/login/voter`);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  render() {
    return (
      <>
        <Header />
        <div className="container scrollable">
          <form onSubmit={this.submitForm}>
            <h1>
              <span className="badge badge-dark">Voter Registration</span>
            </h1>
            <div className="form-group">
              <div className="alert-danger">
                {this.state.error.aadhaarError}
              </div>
              <input
                type="text"
                className="form-control"
                id="aadhaarId"
                placeholder="Enter Aadhaar Id"
                value={this.state.voter.aadhaarId}
                onChange={(e) =>
                  this.setState({
                    voter: { ...this.state.voter, aadhaarId: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <div className="alert-danger">
                {this.state.error.voterFirstName}
              </div>
              <input
                type="text"
                className="form-control"
                id="voterFirstName"
                placeholder="Enter Voter First  Name"
                value={this.state.voter.voterFirstName}
                onChange={(e) =>
                  this.setState({
                    voter: {
                      ...this.state.voter,
                      voterFirstName: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="form-group">
              <div className="alert-danger">
                {this.state.error.voterMiddleName}
              </div>
              <input
                type="text"
                className="form-control"
                id="voterMiddleName"
                placeholder="Enter Voter Middle  Name"
                value={this.state.voter.voterMiddleName}
                onChange={(e) =>
                  this.setState({
                    voter: {
                      ...this.state.voter,
                      voterMiddleName: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="form-group">
              <div className="alert-danger">
                {this.state.error.voterLastName}
              </div>
              <input
                type="text"
                className="form-control"
                id="voterLastName"
                placeholder="Enter Voter Last  Name"
                value={this.state.voter.voterLastName}
                onChange={(e) =>
                  this.setState({
                    voter: {
                      ...this.state.voter,
                      voterLastName: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="form-group">
              <div className="alert-danger">{this.state.error.dobError}</div>
              <input
                type="text"
                className="form-control"
                id="dob"
                placeholder="Enter Date of Birth"
                value={this.state.voter.dob}
                onChange={(e) =>
                  this.setState({
                    voter: { ...this.state.voter, dob: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <div className="alert-danger">{this.state.error.genderError}</div>

              <select
                className="form-control"
                id="gender"
                onChange={(e) =>
                  this.setState({
                    voter: { ...this.state.voter, gender: e.target.value },
                  })
                }
              >
                <option value="" disabled selected hidden>
                  Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="form-group">
              <div className="alert-danger">
                {this.state.error.houseNoError}
              </div>
              <input
                type="text"
                className="form-control"
                id="houseNo"
                placeholder="Enter House No."
                value={this.state.voter.houseNo}
                onChange={(e) =>
                  this.setState({
                    voter: { ...this.state.voter, houseNo: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <div className="alert-danger">{this.state.error.streetError}</div>
              <input
                type="text"
                className="form-control"
                id="street"
                placeholder="Enter Street"
                value={this.state.voter.street}
                onChange={(e) =>
                  this.setState({
                    voter: { ...this.state.voter, street: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <div className="alert-danger">
                {this.state.error.localityError}
              </div>
              <input
                type="text"
                className="form-control"
                id="locality"
                placeholder="Enter Locality"
                value={this.state.voter.locality}
                onChange={(e) =>
                  this.setState({
                    voter: { ...this.state.voter, locality: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <div className="alert-danger">{this.state.error.cityError}</div>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="Enter city"
                value={this.state.voter.city}
                onChange={(e) =>
                  this.setState({
                    voter: { ...this.state.voter, city: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <div className="alert-danger">
                {this.state.error.districtError}
              </div>
              <input
                type="text"
                className="form-control"
                id="district"
                placeholder="Enter District"
                value={this.state.voter.district}
                onChange={(e) =>
                  this.setState({
                    voter: { ...this.state.voter, district: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <div className="alert-danger">{this.state.error.stateError}</div>
              <select
                className="form-control mb-3"
                id="state"
                value={this.state.voter.state}
                onChange={(e) =>
                  this.setState({
                    voter: { ...this.state.voter, state: e.target.value },
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
            <div className="form-group">
              <div className="alert-danger">
                {this.state.error.pincodeError}
              </div>
              <input
                type="text"
                className="form-control"
                id="pincode"
                placeholder="Enter Pincode"
                value={this.state.voter.pincode}
                onChange={(e) =>
                  this.setState({
                    voter: { ...this.state.voter, pincode: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <div className="alert-danger">
                {this.state.error.mobileNoError}
              </div>
              <input
                type="text"
                className="form-control"
                id="mobile"
                placeholder="Enter Mobile Number"
                value={this.state.voter.mobile}
                onChange={(e) =>
                  this.setState({
                    voter: { ...this.state.voter, mobile: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <div className="alert-danger">{this.state.error.emailError}</div>
              <input
                type="text"
                className="form-control"
                id="voterEmail"
                placeholder="Enter Email"
                value={this.state.voter.voterEmail}
                onChange={(e) =>
                  this.setState({
                    voter: { ...this.state.voter, voterEmail: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <div className="alert-danger">
                {this.state.error.passwordError}
              </div>
              <input
                type="password"
                className="form-control"
                id="voterPassword"
                placeholder="Enter Password"
                value={this.state.voter.voterPassword}
                onChange={(e) =>
                  this.setState({
                    voter: {
                      ...this.state.voter,
                      voterPassword: e.target.value,
                    },
                  })
                }
              />
            </div>
            <button
              type="submit"
              className="btn btn-dark"
              onClick={(e) => {
                this.submitForm(e);
              }}
            >
              Register
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default VoterRegistration;
