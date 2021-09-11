import VoterService from "../../service/VoterService";
import {
  FETCH_VOTER_REQUEST,
  FETCH_VOTER_SUCCESS,
  FETCH_VOTER_FAILURE,
} from "./voterTypes";

export const fetchVoter = (aadhaar) => {
  return (dispatch) => {
    dispatch(fetchVoter);
    let service = new VoterService();
    service
      .getVoterByAadhaar(aadhaar)
      .then((response) => {
        const voter = response.data;
        dispatch(fetchVoterSuccess(voter));
      })
      .catch((error) => {
        dispatch(fetchVoterFailure(error.message));
      });
  };
};

export const fetchVoterRequest = () => {
  return {
    type: FETCH_VOTER_REQUEST,
  };
};

export const fetchVoterSuccess = (voter) => {
  return {
    type: FETCH_VOTER_SUCCESS,
    payload: voter,
  };
};

export const fetchVoterFailure = (error) => {
  return {
    type: FETCH_VOTER_FAILURE,
    payload: error,
  };
};
