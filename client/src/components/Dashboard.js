import React, { Component } from "react";
import ReactFileReader from "react-file-reader";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import * as actions from "../actions";
import { fetchConcerns } from "../actions";
import { fetchUser } from "../actions";
import ConcernsMatch from "./concerns/ConcernsMatch";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = {
      matchedNames: [],
      fetchUser: fetchUser()
    };
    console.log(this.state.fetchUser.user_id);
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
      //return result; //JavaScript object
      // result= JSON.stringify(result); //JSON
      for (var k = 0; k < result.length; k++) {
        console.log(result[k].NAME);
        matchedNames.push(result[k].NAME);
      }
      // this.setState(
      //   update(this.state, {matchedNames: {$push: matchedNames}})
      // )
      console.log(matchedNames);
      self.setState({ matchedNames: matchedNames });

      // console.log(result);
    };
    console.log(this);
    // setTimeout(() => {
    //   this.setState({
    //     matchedNames: matchedNames
    //   });
    // }, 1500);
    reader.readAsText(files[0]);
    console.log(matchedNames);
  };

  render() {
    console.log(this.state);
    console.log(this.props);

    return (
      <div className="top">
        <div className="row">
          <div className="col s3">
            <img
              className="img-fluid"
              src="img/fours.png"
              alt=""
            />
          </div>
          <div className="col s9">
            <ReactFileReader handleFiles={this.handleFiles} fileTypes={".csv"}>
              <button className="btn">Upload</button>
              <span>&nbsp; &nbsp; Upload a new Arrivals Report</span>
            </ReactFileReader>
            <ConcernsMatch matchednames={this.state.matchedNames} />
            <br />
            <Link to="/concerns/search" className="btn">
              Search
            </Link>
            <br />
            <br />
            <Link to="/concerns/new" className="btn">
              Add
            </Link>
            <span>&nbsp;&nbsp; Add a new CONCERN</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
