import { combineReducers } from "redux";
import voterReducer from "./voter/voterReducer";
const rootReducer = combineReducers({
  voter: voterReducer,
});

export default rootReducer;
