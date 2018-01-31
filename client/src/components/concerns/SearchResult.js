import React, { Component } from "react";
import { Button, Card, Row, Col } from "react-materialize";
import axios from "axios";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      descOfRecovery: "",
      recoveryCheck: new Date().toLocaleDateString(),
      recoveryUpdates: [],
      areMatches: true
    };
    this.handleRecovery = this.handleRecovery.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  show() {
    this.setState = { visible: true };
  }
  hide() {
    this.setState = { visible: false };
  }

  handleRecovery(event) {
    this.setState({ descOfRecovery: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const guestName = this.props.matches.guestName;
    const zipCode = this.props.matches.zipCode;
    const descOfRecovery = this.state.descOfRecovery;
    const recoveryCheck = this.state.recoveryCheck;
    axios
      .post("/api/concerns_update", {
        params: {
          guestName,
          zipCode,
          descOfRecovery,
          recoveryCheck
        }
      })
      .then(res => {
        this.setState({
          recoveryUpdates: res.data
        });
      });
  }

  render() {
    const visible = this.state.visible;
    console.log(this.props);
    console.log(this.state);
    console.log(new Date().toLocaleDateString());
    var event = new Date();
    var now = event.toLocaleDateString();

    return this.props.matches.map(match => {
      let recovery = match.descOfRecovery;
      if (!recovery) {
        recovery = "N/A";
      }
      let recoverycheck = match.recoveryCheck;
      if (!recoverycheck) {
        recoverycheck = "N/A";
      }
      return (
        <div key={match._id}>
          <Card
            className="card searchResultCard"
            textClassName="white-text"
            onClick={() => this.setState({ visible: true })}
          >
            <span className="card-title">
              {match.guestName} from {match.zipCode}
            </span>
            <p>{match.descOfConcern}</p>
            <p>
              Date Logged: {new Date(match.dateRecorded).toLocaleDateString()}
            </p>
            <p>By: {match.clerkId}</p>
            {!visible ? (
              <div className="card-action">
                <a>Recovery: {recovery}</a>
                <a>Dated: {recoverycheck}</a>
              </div>
            ) : null}
            <div>
              {/* <button>show</button> */}
              {visible ? (
                <div>
                  <br />
                  <form
                    id="searchUpdateForm"
                    onSubmit={this.handleSubmit}
                    visible={this.state.visible}
                    onClose={this.hide.bind(this)}
                  >
                    <div>
                      <label>RECOVERY</label>
                      <input
                        type="text"
                        name="descOfRecovery"
                        placeholder="Please provide a description of the recovery."
                      />
                    </div>
                    <div>
                      <label>RECOVERY DATE</label>
                      <input placeholder={now} readOnly />
                    </div>
                    {/* <a class="btn-floating btn-large waves-effect waves-light">
                      <i class="material-icons">add</i>
                    </a> */}

                    <button type="submit" >SUBMIT</button>
                  </form>
                </div>
              ) : null}
            </div>
          </Card>
        </div>
      );

      // });
    });
  }
}

export default SearchResult;
