import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import concernsReducer from "./concernsReducer";
import searchReducer from "./searchReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  concerns: concernsReducer,
  search: searchReducer
});