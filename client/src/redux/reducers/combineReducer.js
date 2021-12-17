import { combineReducers } from "redux";
import UserReducer from "./userReducer";

const allReducers = combineReducers({
  user: UserReducer,
});

export default allReducers;
