import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import ConcernNew from "./concerns/ConcernNew";
import ReactFileReader from "react-file-reader";

class App extends Component {
  //right after component renders do this => (this case action creator)
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <br />

              {/* <ReactFileReader
                fileTypes={[".csv", ".zip"]}
                base64={true}
                multipleFiles={true}
                handleFiles={this.handleFiles}
              >
                <button className="btn">Upload</button>
              </ReactFileReader> */}

              <Route exact path="/concerns" component={Dashboard} />
              <Route path="/concerns/new" component={ConcernNew} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
