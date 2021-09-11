import axios from "axios";

class VoterService {
  baseUrl = `http://localhost:9090/election-api/e-voting/voter/`;

  voterLogin(voter) {
    return axios.post(this.baseUrl + `-/login`, voter);
  }
  getVoterByAadhaar(aadhaarId) {
    return axios.get(this.baseUrl + `viewVoterDetailsById/${aadhaarId}`);
  }
  addVoter(voter) {
    return axios.post(this.baseUrl + `-/addVoter`, voter);
  }
  getElectionSchedule() {
    return axios.get(this.baseUrl + `viewElectionSchedule`);
  }
  getParty() {
    return axios.get(this.baseUrl + `viewParties`);
  }
  getCandidates() {
    return axios.get(this.baseUrl + `viewCandidates`);
  }
  viewCandidatesByConstituency(aadhaarId) {
    return axios.get(this.baseUrl + `viewCandidatesByConstituency/${aadhaarId}`);
  }
  getVoteForAllCandidates(){
    return axios.get(this.baseUrl+`results/viewAllCandidatesVoteCount`);
  }
  getVoteForAllParty(){
    return axios.get(this.baseUrl+`results/viewPartyVoteCount`);
  }
  getVoteForConstituency(constituency){
    return axios.get(this.baseUrl+`results/viewPartyVoteConstituency/${constituency}`);
  }
  castVote(vote) {
    return axios.post(this.baseUrl + `/castVote`, vote);
  }
}
export default VoterService;
