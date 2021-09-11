import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchVoter } from "../../redux/voter/voterAction";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import profile from "../../asset/profile.jpg";
import schedule from "../../asset/schedule.jpg";
import parties from "../../asset/parties.png";
import candidates from "../../asset/candidates.jpg";
import constituency from "../../asset/constituency.jpg";
import election from "../../asset/election.jpg";
import result from "../../asset/result.jpg";
import Header from "../common/Header";
import "../Home.css";

function DashboardVoter({ voterData, fetchVoter }) {
  const history = useHistory();

  useEffect(() => {
    if (sessionStorage.getItem("voter")) {
      const id = sessionStorage.getItem("voter");
      fetchVoter(id);
    } else {
      history.push("/login/voter");
      alert("Unauthorized Access Denied");
    }
  }, []);

  return voterData.loading ? (
    <>Loading...</>
  ) : voterData.error ? (
    <>{voterData.voterData}</>
  ) : (
    <div className="voter">
      <Header user="voter" />
      {/* <b>
        {"Welcome " +
          voterData.voter.voterFirstName +
          " " +
          voterData.voter.voterLastName}
      </b> */}
      <div className="row mr-1 mt-5">
        <div className="col-3">
          <Card
            style={{
              width: "100%",
              margin: "10px",
              backgroundColor: "black",
              color: "white",
            }}
            onClick={() => history.push(`/viewProfile`)}
          >
            <Card.Img variant="top" src={profile} />
            <Card.Body>
              <Card.Title> View Your Profile</Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div className="col-3">
          <Card
            style={{
              width: "100%",
              margin: "10px",
              backgroundColor: "black",
              color: "white",
            }}
            onClick={() => history.push("/viewElectionSchedule")}
          >
            <Card.Img variant="top" src={schedule} />
            <Card.Body>
              <Card.Title> View Election Schedule</Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div className="col-3">
          <Card
            style={{
              width: "100%",
              margin: "10px",
              backgroundColor: "black",
              color: "white",
            }}
            onClick={() => history.push("/viewParties")}
          >
            <Card.Img variant="top" src={parties} />
            <Card.Body>
              <Card.Title>View All Party</Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div className="col-3">
          <Card
            style={{
              width: "100%",
              margin: "10px",
              backgroundColor: "black",
              color: "white",
            }}
            onClick={() => history.push("/viewCandidates")}
          >
            <Card.Img variant="top" src={candidates} />
            <Card.Body>
              <Card.Title>View All Candidates</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="row mr-0 ml-1 mt-4 mb-5">
        <div className="col-4">
          <Card
            style={{
              width: "75%",
              marginLeft: "125px",
              backgroundColor: "black",
              color: "white",
            }}
            onClick={() => history.push("/candidatesInMyConstituency")}
          >
            <Card.Img variant="top" src={constituency} />
            <Card.Body>
              <Card.Title>Candidates In Your Constituency</Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div className="col-4">
          <Card
            style={{
              width: "75%",
              margin: "auto",
              backgroundColor: "black",
              color: "white",
            }}
            onClick={() => history.push("/castVote")}
          >
            <Card.Img variant="top" src={election} />
            <Card.Body>
              <Card.Title>Cast Your Vote</Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div className="col-4">
          <Card
            style={{ width: "75%", backgroundColor: "black", color: "white" }}
            onClick={() => history.push("/ViewResults")}
          >
            <Card.Img variant="top" src={result} />
            <Card.Body>
              <Card.Title> Election Results</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    voterData: state.voter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVoter: (id) => dispatch(fetchVoter(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardVoter);
