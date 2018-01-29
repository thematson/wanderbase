import axios from "axios";
import { FETCH_USER, FETCH_CONCERNS, FETCH_MATCHES, FETCH_SEARCH } from "./types";

// this is and ACTION CREATOR
//when the fetchUser is called, it will return a function
//redux-thunk will see the function return and call it with dispatch
//make a request, wait for response... when we get response, and only then
//the action will dispatch
// async goes before the function waiting a promise
// await (when the function is carried out) is assigned to the res variable
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitConcern = (values, history) => async dispatch => {
  const res = await axios.post("/api/concerns", values);

  history.push("/concerns");
  dispatch({ type: FETCH_CONCERNS, payload: res.data });
};

export const fetchConcerns = () => async dispatch => {
  const res = await axios.get("/api/concerns");

  dispatch({ type: FETCH_MATCHES, payload: res.data });
};

export const searchConcerns = (guestName) => async dispatch => {
  console.log(guestName);

  const res = await axios.get('/api/concern_search', { params : {guestName}});
  console.log("this is this sdfasfsdfnsdjkfnsd", res);
  console.log(res.data);

  dispatch({ type: FETCH_SEARCH, payload: res.data});
}


//  console.log(guestName);

//   const res = await axios.get('/api/concern_search', { params : {guestName}});
//   console.log("this is this sdfasfsdfnsdjkfnsd", res);
//   console.log(res.data);


//   dispatch({ type: FETCH_SEARCH, payload: res.data});