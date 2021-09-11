import {
  FETCH_VOTER_REQUEST,
  FETCH_VOTER_SUCCESS,
  FETCH_VOTER_FAILURE,
} from "./voterTypes";

const initialState = {
  loading: false,
  voter: {},
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VOTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_VOTER_SUCCESS:
      return {
        loading: false,
        voter: action.payload,
        error: "",
      };
    case FETCH_VOTER_FAILURE:
      return {
        loading: false,
        voter: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
