import axios from 'axios';

class AdminService {
    baseUrl= `http://localhost:9090/election-api/e-voting/admin/`;

    adminLogin(admin){
        return axios.post(this.baseUrl + `-/login`, admin);
    }
    getAllElection(){
        return axios.get(this.baseUrl+`election/findAllElections`);
    }
    getElectionById(electionId){
        return axios.get(this.baseUrl+`election/findElectionById:${electionId}`);
    }
    getElectionByName(electionName){
        return axios.get(this.baseUrl+`/election/findElectionByName:${electionName}`);
    } 
    getElectionByType(electionType){
        return axios.get(this.baseUrl+`/election/findElectionByType:${electionType}`);
    }
    addElection(election){
        return axios.post(this.baseUrl+`election/addElection`, election);
    }
    updateElectionName(election){
        return axios.put(this.baseUrl+`/election/editElectionName/election_ID:${election.electionId}/name:${election.electionName}`);
    }
    updateElectionType(election){
        return axios.put(this.baseUrl+`/election/editElectionType/election_ID:${election.electionId}/type:${election.electionType}`);
    }
    updateElectionDate(election){
        return axios.put(this.baseUrl+`election/editElectionDate/election_ID:${election.electionId}/electionDate:${election.electionDate}`);
    }
    deleteElection(electionId){
        return axios.delete(this.baseUrl+`election/removeElection:${electionId}`)
    }
    getAllConstituency(){
        return axios.get(this.baseUrl+`constituency/viewAllConstituency`);
    } 
    getConstituencyById(constituencyId){
        return axios.get(this.baseUrl+`constituency/searchByConstituencyId/${constituencyId}`);
    } 
    getConstituencyByName(constituencyName){
        return axios.get(`${this.baseUrl}constituency/searchByConstituencyName/${constituencyName}`); 
    }
    addConstituency(constituency){
        return axios.post(this.baseUrl+`constituency/addConstituency`,constituency);
    } 
    updateConstituency(constituencyId, constituencyName){
        return axios.put(this.baseUrl +`constituency/modifyConstituencyName/${constituencyId}/${constituencyName}`)
    }
    deleteConstituencyById(constituencyId){
        return axios.delete(this.baseUrl+`constituency/deleteconstituencybyConstituencyId/${constituencyId}`)
    }
    getAllParty() {
        return axios.get(this.baseUrl+`party/allParties`);
    }
    getPartyById(partyId) {
        return axios.get(this.baseUrl+`party/searchByPartyId/${partyId}`);
    }
    getPartyByName(partyName){
        return axios.get(this.baseUrl+`party/searchByPartyName/${partyName}`)
    }
    addParty(party){
        return axios.post(this.baseUrl+`party/addParty`, party ) 
    }
    updateParty(regId, leader){
        return axios.put(this.baseUrl+`party/modifyLeader/${regId}/${leader}`)
    }
    deletePartyById(regId){
        return axios.delete(this.baseUrl+`party/deletePartyById/${regId}`)
    }
    getCandidatesByParty(regId){
        return axios.get(this.baseUrl+`candidate/viewAllCandidates/${regId}`);
    }
    getAllCandidates() {
        return axios.get(this.baseUrl+`candidate/viewAllCandidates/`);
    } 
    getCandidateById(candidateId){
        return axios.get(this.baseUrl+`candidate/searchByCandidateId/${candidateId}`);
    }
    getCandidateByName(candidateName){
        return axios.get(this.baseUrl+`candidate/searchByCandidateName/${candidateName}`)
    }
    addCandidate(candidate){
        return axios.post(this.baseUrl+`candidate/addCandidate`,candidate )
    }
    updateCandidate(candidateId, candidateName){
        return axios.put(this.baseUrl +`/candidate/modifyCandidateName/${candidateId}/${candidateName}`)
    }
    deleteCandidateById(candidateId){
        return axios.delete(this.baseUrl+`candidate/deleteCandidateById/${candidateId}`)
    }
    getAllVoters(){
        return axios.get(this.baseUrl+`voter/viewAllVoter/`);
    }
    getAllVoterRequests(){
        return axios.get(this.baseUrl+`voter/viewAllRequests`)
    }
    updateVoterStatus(epic){
        return axios.put(this.baseUrl+`/voter/updateStatusOfVoter/${epic}`)
    }
    getVoterByEpic(epic){
        return axios.get(this.baseUrl+`voter/findVoterByEpic/${epic}`)
    }
    addPincode(pincode){
        return axios.post(this.baseUrl+`pincode/addPincode`, pincode);
    }
}

export default AdminService;