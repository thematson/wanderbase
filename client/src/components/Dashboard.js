import React, { Component } from "react";
import ReactFileReader from "react-file-reader";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import * as actions from "../actions";
import { fetchConcerns } from "../actions";
import { fetchUser } from "../actions";
import ConcernsMatch from "./concerns/ConcernsMatch";

var ReactRotatingText = require("react-rotating-text");

class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = {
      matchedNames: [],
      fetchUser: fetchUser(),
      searchComplete: false
    };
  }

  handleFiles = files => {
    const matchedNames = [];
    var reader = new FileReader();
    var self = this;
    reader.onload = function(e) {
      // Use reader.result
      var csv = reader.result;
      var lines = csv.split("\n");
      var result = [];
      var headers = lines[0].split(",");
      for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }
        result.push(obj);
      }

      for (var k = 0; k < result.length; k++) {
        console.log(result[k].NAME);
        matchedNames.push(result[k].NAME);
      }

      console.log(matchedNames);
      self.setState({
        matchedNames: matchedNames,
        searchComplete: true
      });

    };
    console.log(this);

    reader.readAsText(files[0]);
    console.log(matchedNames);
  };

  render() {
    console.log(this.state);
    console.log(this.props.auth);

    if (this.props.auth) {
      var userName = this.props.auth.userName.toUpperCase().split(".");
    } else {
      var userName = "";
    }

    return (
      <div className="top">
        <div className="row">
          <div className="col s3" id="firstColumn">
            <h2>Welcome,</h2>
            <h2>
              {userName[0]} {userName[1]}
            </h2>
            <img
              className="img-fluid"
              id="splashlogo"
              src="img/fours.png"
              alt=""
            />

            <br />
            <br />
            <div id="textCrawlDiv">
            <ReactRotatingText
              id="textCrawl"
              items={[
                "The best way to find yourself is to lose yourself in the service of others. - Ghandi",
                "People will forget what you said - forget what you did - but people will never forget how you made them feel - Maya Angelou",
                "Do what you do so well that they want to see it again and bring their friends. - Walt Disney",
                "Hospitality is making your guests feel like they're at home, even if you wish they were. - Justine Vogt"
              ]}
              deletingInterval="20"
              style={{ fontSize: "25px" }}
            />
            </div>
          </div>
          <div className="col s3" id="secondColumn">
            <br />
            <div className="row" id="middlerows">
              <br />
              <Link to="/concerns/search" className="btn" id="searchButton">
                <i class="material-icons md-36 right">search</i>
                Search for Concerns
              </Link>
            </div>
            <br />
            <br />
            <Link to="/concerns/new" className="btn" id="addButton">
              <i class="material-icons md-36 right">library_add</i>
              Add a New Concern
            </Link>
          </div>
          <div className="col s3" id="thirdColumn">
            <br />
            <div className="row" id="middlerows">
              <ReactFileReader
                handleFiles={this.handleFiles}
                fileTypes={".csv"}
              >
                <button className="btn" id="uploadButton">
                  <i className="material-icons right md-36">file_upload</i>Upload
                  Arrivals
                </button>
                <br />
              </ReactFileReader>
              <ConcernsMatch matchednames={this.state.matchedNames} searchComplete={this.state.searchComplete}/>
            </div>
            <br/>
            <br/>
            <Link to="/concerns/all" className="btn" id="addButton">
              <i class="material-icons md-36 right">assignment</i>
              See all Concerns
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Dashboard);
