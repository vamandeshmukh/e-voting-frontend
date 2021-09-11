import React from "react";
import { Card } from "react-bootstrap";
import election from "../../asset/election.jpg";
import constituency from "../../asset/constituency.jpg";
import pincode from "../../asset/pincode.png";
import parties from "../../asset/parties.png";
import candidates from "../../asset/candidates.jpg";
import voters from "../../asset/voter.jpg";
import "../Home.css";
import Header from "../common/Header";

class DashboardAdmin extends React.Component {
  componentDidMount() {
    if (!sessionStorage.getItem("admin")) {
      this.props.history.push("/login/admin");
      alert("Unauthorized Access Denied");
    }
  }

  render() {
    return (
      <>
        <Header user="admin" />
        {/* <h3>Welcome to Administrator Portal</h3> */}
        <div className="row ml-5 mr-0">
          <div className="col-4">
            <Card
              style={{
                width: "85%",
                margin: "10px",
                backgroundColor: "black",
                color: "white",
              }}
              onClick={() =>
                this.props.history.push("/admin/election/viewElection")
              }
            >
              <Card.Img variant="top" src={election} />
              <Card.Body>
                <Card.Title>Election</Card.Title>
                <Card.Text>Add, Update, Delete and View Election.</Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="col-4">
            <Card
              style={{
                width: "85%",
                margin: "10px",
                float: "left",
                backgroundColor: "black",
                color: "white",
              }}
              onClick={() =>
                this.props.history.push("/admin/constituency/viewConstituency")
              }
            >
              <Card.Img variant="top" src={constituency} />
              <Card.Body>
                <Card.Title>Constituency</Card.Title>
                <Card.Text>
                  Add, Update, Delete and View Constituency.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="col-4">
            <Card
              style={{
                width: "85%",
                margin: "10px",
                backgroundColor: "black",
                color: "white",
              }}
              onClick={() =>
                this.props.history.push("/admin/pincode/addPincode")
              }
            >
              <Card.Img variant="top" src={pincode} />
              <Card.Body>
                <Card.Title>Pincode</Card.Title>
                <Card.Text>Add Pincodes to Constituency.</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="row ml-5 mr-0">
          <div className="col-4">
            <Card
              style={{
                width: "85%",
                margin: "10px",
                backgroundColor: "black",
                color: "white",
              }}
              onClick={() => this.props.history.push("/admin/party/viewParty")}
            >
              <Card.Img variant="top" src={parties} />
              <Card.Body>
                <Card.Title>Party</Card.Title>
                <Card.Text>Add, Update, Delete and View Party.</Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="col-4">
            <Card
              style={{
                width: "85%",
                margin: "10px",
                backgroundColor: "black",
                color: "white",
              }}
              onClick={() =>
                this.props.history.push("/admin/candidates/viewCandidates")
              }
            >
              <Card.Img variant="top" src={candidates} />
              <Card.Body>
                <Card.Title>Candidates</Card.Title>
                <Card.Text>Add, Update, Delete and View Candidates.</Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="col-4">
            <Card
              style={{
                width: "85%",
                margin: "10px",
                backgroundColor: "black",
                color: "white",
              }}
              onClick={() =>
                this.props.history.push("/admin/voter/viewVoterAdmin")
              }
            >
              <Card.Img variant="top" src={voters} />
              <Card.Body>
                <Card.Title>Voters</Card.Title>
                <Card.Text>Update and View Voters.</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </>
    );
  }
}

export default DashboardAdmin;
