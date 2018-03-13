import React, { Component } from "react";
import { connect } from "react-redux";
import { searchConcerns } from "../../actions";
import ConcernField from "./ConcernField";
import SearchResult from "./SearchResult";
import axios from "axios";
import { Button, Card, Row, Col } from "react-materialize";

import { Link } from "react-router-dom";

class ConcernSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guestName: "",
      zipCode: "",
      matches: [],
      submission: false
    };

    this.handleName = this.handleName.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleName(event) {
    this.setState({ guestName: event.target.value });
  }

  handleZip(event) {
    this.setState({ zipCode: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.submission);
    this.setState({ submission: true });
    console.log(this.state.submission);

    const guestName = this.state.guestName;
    const zipCode = this.state.zipCode;
    axios
      .get("/api/concern_search", { params: { guestName, zipCode } })
      .then(res => {
        console.log(res);

        this.setState({
          matches: res.data
        });
      });
    console.log(this.state.submission);
    console.log(this.state.matches);
  }

  render() {
    if (this.state.matches.length === 0 && this.state.submission === true) {
      return (
        <div className="top">
          <Link to="/concerns">
            <Card className="noResults" style={{ padding: 0, color: "black" }}>
              <span
                className="card-title"
                style={{ background: "white", padding: 0 }}
              >
                There are no results.
              </span>
              Click to Return to Dashboard.
            </Card>
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <div id="searchResultDiv">
            <form id="searchConcernForm" onSubmit={this.handleSubmit}>
              <div>
                <label className="searchForm">Guest Name</label>
                <div>
                  <input
                    name="guestName"
                    id="searchNameInput"
                    value={this.state.guestName}
                    onChange={this.handleName}
                    component="input"
                    type="text"
                    placeholder="LAST/FIRST"
                  />
                </div>
              </div>
              <div>
                <label className="searchForm">Zip Code</label>
                <div>
                  <input
                    name="zipCode"
                    id="searchZipInput1"
                    value={this.state.zipCode}
                    onChange={this.handleZip}
                    component="input"
                    type="text"
                    placeholder="ZIP CODE"
                  />
                </div>
              </div>
              <div>
                <button id="searchConcernButton" type="submit">
                  <h5>SEARCH</h5>
                </button>
              </div>
              <div className="centeringDiv">
                <Link to="/concerns" className="btn btn-cancel red-text">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
          <div>
            <SearchResult matches={this.state.matches} />
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps({ matches }) {
  return { matches };
  console.log(this.props);
}

export default connect(mapStateToProps, { searchConcerns })(ConcernSearch);

