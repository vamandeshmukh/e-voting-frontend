import axios from "axios";
class EoService{
    baseUrl = `http://localhost:9090/election-api/e-voting/eo/`;

    eoLogin(eo){
        return axios.post(this.baseUrl + `-/login`, eo);
    }
    getAllVoters(){
        return axios.get(this.baseUrl+`viewAllVoters`);
    }
    getAllVoterRequests(){
        return axios.get(this.baseUrl + `viewAllRequests`);
    }
    getVoterById(aadhaar){
        return axios.get(this.baseUrl+`viewVoterRequestById/${aadhaar}`);
    }
    updateVoterStatus(updatedstatus,aadhaar){
        return axios.put(this.baseUrl+`updateVoterStatus/${updatedstatus}/${aadhaar}`);
    }
}
export default EoService;