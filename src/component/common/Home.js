import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Header from "./Header";
import { Card, Button } from "react-bootstrap";
import "../Home.css";
import carousel1 from "../../asset/asset1.jpg";
import carousel2 from "../../asset/asset2.jpg";
import carousel3 from "../../asset/asset3.jpg";
import guidelines from "../../asset/guidelines.png";
import process from "../../asset/process.png";
import flow from "../../asset/flow.JPG";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("admin") != null) {
      this.setState({ user: "admin" });
    }
    if (sessionStorage.getItem("eo") != null) {
      this.setState({ user: "eo" });
    }
    if (sessionStorage.getItem("voter") != null) {
      this.setState({ user: "voter" });
    }
  }

  render() {
    return (
      <>
        <Header user={this.state.user} />
        <div className="container-fluid" style={{ marginTop: "15px" }}>
          <div className="flag">
            <h3>Mera Vote Mera Aadhikar</h3>
          </div>

          <div className="row mb-4">
            <div className="col-8">
              <Card
                style={{
                  width: "97%",
                  marginLeft: "7%",
                  backgroundColor: "black",
                  color: "white",
                  border: "2px black solid",
                }}
              >
                <Card.Img variant="top" src={guidelines} />
              </Card>
            </div>
            <div className="col-4">
              <Card
                style={{
                  width: "76%",
                  marginLeft: "8%",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                <Card.Img variant="top" src={process} />
                <Button
                  className="btn btn-success btn-lg"
                  onClick={() => this.props.history.push("/voterRegistration")}
                >
                  Register
                </Button>
              </Card>
            </div>
          </div>

          <Carousel style={{ marginBottom: "20px" }}>
            <Carousel.Item style={{ height: "100%" }}>
              <img className="w-100" src={carousel1} />
            </Carousel.Item>
            <Carousel.Item style={{ height: "100%" }}>
              <img className="w-100" src={carousel2} />
            </Carousel.Item>
            <Carousel.Item style={{ height: "100%" }}>
              <img className="w-100" src={carousel3} />
            </Carousel.Item>
          </Carousel>
          {/* <div className="row"> */}
          <Card
            style={{
              width: "88%",
              margin: "auto",
              marginTop: "20px",
              border: "2px black solid",
            }}
          >
            <Card.Img variant="top" src={flow} />
          </Card>
          {/* </div> */}
        </div>
      </>
    );
  }
}

export default Home;
