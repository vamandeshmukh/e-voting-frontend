import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './component/common/Footer';
import Home from './component/common/Home';
import About from './component/common/About';
import Contact from './component/common/Contact';
import DashboardAdmin from './component/admin/DashboardAdmin'
import ViewAllElection from './component/admin/ViewAllElection'
import ViewElection from './component/admin/ViewElection'
import AddUpdateElection from './component/admin/AddUpdateElection';
import DeleteElection from './component/admin/DeleteElection';
import ViewAllParty from './component/admin/ViewAllParty';
import ViewParty from './component/admin/ViewParty';
import AddUpdateParty from './component/admin/AddUpdateParty';
import DeleteParty from './component/admin/DeleteParty';
import AddUpdateCandidate from './component/admin/AddUpdateCandidate';
import DeleteCandidate from './component/admin/DeleteCandidate';
import ViewAllCandidates from './component/admin/ViewAllCandidates';
import ViewCandidates from './component/admin/ViewCandidates';
import AddUpdateConstituency from './component/admin/AddUpdateConstituency';
import DeleteConstituency from './component/admin/DeleteConstituency';
import ViewAllConstituency from './component/admin/ViewAllConstituency';
import ViewConstituency from './component/admin/ViewConstituency';
import ViewAllVotersAdmin from './component/admin/ViewAllVotersAdmin';
import ViewVoterByEpic from './component/admin/ViewVoterByEpic';
import ViewAllVotersRequestsAdmin from './component/admin/ViewAllVoterRequestsAdmin';
import AddPincode from './component/admin/AddPincode';
import DashboardEo from './component/eo/DashboardEo'
import ViewVoterByAadhaar from './component/eo/ViewVoterByAadhaar';
import ViewAllVotersEo from './component/eo/ViewAllVotersEo';
import DashboardVoter from './component/voter/DashboardVoter';
import ViewVoterProfile from './component/voter/ViewVoterProfile';
import VoterRegistration from './component/common/VoterRegistration';
import ViewElectionSchedule from './component/voter/ViewElectionSchedule';
import ViewPartiesVoter from './component/voter/ViewPartiesVoter';
import ViewCandidatesVoter from './component/voter/ViewCandidatesVoter';
import ViewCandidatesByConstituency from './component/voter/ViewCandidatesByConstituency';
import ViewResults from './component/voter/ViewResults';
import CastVote from './component/voter/CastVote';
import Login from './component/common/Login';
import Logout from './component/common/Logout';
import ImageUpload from './component/ImageUpload';

function App() {
  return (
    <div>
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} /> 
          <Route exact path="/voterRegistration" component={VoterRegistration} />  
          <Route exact path="/upload" component={ImageUpload} />
          {/* Admin */}       
          <Route exact path="/login/:user" component={Login} />
          <Route exact path="/logout/:user" component={Logout} />
          <Route exact path="/admin/dashboard" component={DashboardAdmin} />
          <Route exact path="/admin/election/viewElection" component={ViewAllElection} />
          <Route exact path="/admin/election/viewElection/:id" component={ViewElection} />
          <Route exact path="/admin/election/addElection/:id" component={AddUpdateElection} />
          <Route exact path="/admin/election/updateElection/:id" component={AddUpdateElection} />
          <Route exact path="/admin/election/deleteElection/:id" component={DeleteElection} />
          <Route exact path="/admin/party/viewParty" component={ViewAllParty} />
          <Route exact path="/admin/party/viewParty/:id" component={ViewParty} />
          <Route exact path="/admin/party/addParty/:id" component={AddUpdateParty} />
          <Route exact path="/admin/party/updateParty/:id" component={AddUpdateParty} />
          <Route exact path="/admin/party/deleteParty/:id" component={DeleteParty} />
          <Route exact path="/admin/candidates/viewCandidates" component={ViewAllCandidates} />
          <Route exact path="/admin/candidates/viewCandidates/:id" component={ViewCandidates} />
          <Route exact path="/admin/candidates/addCandidate/:id" component={AddUpdateCandidate} />
          <Route exact path="/admin/candidates/updateCandidate/:id" component={AddUpdateCandidate} />
          <Route exact path="/admin/candidates/deleteCandidate/:id" component={DeleteCandidate} />
          <Route exact path="/admin/constituency/viewConstituency"component={ViewAllConstituency}/>
          <Route exact path="/admin/constituency/viewConstituency/:id"component={ViewConstituency}/>
          <Route exact path="/admin/constituency/addConstituency/:id" component={AddUpdateConstituency} />
          <Route exact path="/admin/constituency/updateConstituency/:id" component={AddUpdateConstituency} />
          <Route exact path="/admin/constituency/deleteConstituency/:id" component={DeleteConstituency} />
          <Route exact path="/admin/pincode/addPincode" component={AddPincode} />
          <Route exact path="/admin/voter/viewVoterAdmin" component={ViewAllVotersAdmin} />
          <Route exact path="/admin/voter/viewVoterEpic/:id" component={ViewVoterByEpic} />
          <Route exact path="/admin/voter/viewVoterRequest" component={ViewAllVotersRequestsAdmin} />
          {/* EO */}
          <Route exact path="/login/:user" component={Login} />
          <Route exact path="/logout/:user" component={Logout} />
          <Route exact path="/eo/dashboard" component={DashboardEo} />
          <Route exact path="/viewVotersEo" component={ViewAllVotersEo} />
          <Route exact path="/viewVoter/:id" component={ViewVoterByAadhaar} />
          {/* Voter */}
          <Route exact path="/login/:user" component={Login} />
          <Route exact path="/logout/:user" component={Logout} />
          <Route exact path="/voter/dashboard" component={DashboardVoter} />
          <Route exact path="/viewProfile" component={ViewVoterProfile} />  
          <Route exact path="/viewElectionSchedule" component={ViewElectionSchedule} /> 
          <Route exact path="/viewParties" component={ViewPartiesVoter} /> 
          <Route exact path="/viewCandidates" component={ViewCandidatesVoter} />
          <Route exact path="/castVote" component={CastVote} /> 
          <Route exact path="/viewResults" component={ViewResults} /> 
          <Route exact path="/candidatesInMyConstituency" component={ViewCandidatesByConstituency} />  
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
