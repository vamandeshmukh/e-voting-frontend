import React from "react";
import { Card } from "react-bootstrap";
import "../Home.css";
import Header from "../common/Header";
import voter from "../../asset/voter.jpg";
import eo from "../../asset/eo.jpg";

class DashboardEo extends React.Component {
  componentDidMount() {
    if (!sessionStorage.getItem("eo")) {
      this.props.history.push("/login/eo");
      alert("Unauthorized Access Denied");
    }
  }

  render() {
    return (
      <>
        <Header user="eo" />
        <div className="eocontainer">
          <div
            className="eoleft"
            style={{ backgroundImage: `url(${eo})` }}
          ></div>
          <div className="eoright">
            <Card
              style={{
                width: "70%",
                marginTop: "50px",
                marginBottom: "50px",
                marginLeft: "100px",
                backgroundColor: "black",
                color: "white",
              }}
              onClick={() => this.props.history.push("/viewVotersEo")}
            >
              <Card.Img variant="top" src={voter} />
              <Card.Body>
                <Card.Title>View Voter Requests</Card.Title>
                <Card.Text>
                  View Voter requests and update voter status.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div></div>
        </div>
      </>
    );
  }
}

export default DashboardEo;
