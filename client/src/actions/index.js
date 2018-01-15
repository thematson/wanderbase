import axios from "axios";
import { FETCH_USER } from "./types";

// this is and ACTION CREATOR
//when the fetchUser is called, it will return a function
//redux-thunk will see the function return and call it with dispatch
//make a request, wait for response... when we get response, and only then
//the action will dispatch
// async goes before the function waiting a promise
// await (when the function is carried out) is assigned to the res variable
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user")

  dispatch({ type: FETCH_USER, payload: res.data });
};

