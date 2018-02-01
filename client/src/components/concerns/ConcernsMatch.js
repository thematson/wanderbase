import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchConcerns } from "../../actions";
import Dashboard from "../Dashboard";
import { Button, Card, Row, Col } from "react-materialize";
import Rodal from "rodal";
import { Link } from "react-router-dom";

import "rodal/lib/rodal.css";
import { log } from "util";

class ConcernsMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
      // searchComplete: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  show() {
    this.setState = { visible: true };
  }
  hide() {
    this.setState = { visible: false };
  }

  // searchComplete() {
  //   this.setState = { searchComplete : true };
  // }
  componentDidMount() {
    this.props.fetchConcerns();
    console.log(this.props.concerns);
    console.log(this.props);
  }

  handleClick() {
    document.getElementById("theMatches").innerHTML = "";
    this.forceUpdate();
  }

  renderMatches() {
    let _ = require("underscore");
    console.log(this.props);

    const here = this.props;
    console.log(here.concerns);
    console.log(here.matchednames);
    var matches = [];

    for (var i = 0; i < here.concerns.length; i++) {
      for (var j = 0; j < here.matchednames.length; j++) {
        console.log(here.concerns[i].guestName);

        if (
          here.concerns[i].guestName.toUpperCase() ==
          here.matchednames[j].toUpperCase()
        ) {
          if (matches.indexOf(here.concerns[i]) === -1) {
            matches.push(here.concerns[i]);
          }
        }
      }
    }

    console.log(matches);
    const { visible } = this.state;

    if (matches.length === 0 && here.searchComplete) {
      return (
        <div id="nothingHere">
          <Card id="nothingHereCard">
            <h5>There are no Arrivals with Concerns</h5>
          </Card>
        </div>
      );
    } else {
      return matches.map(matches => {
        var event = new Date();
        var now = event.toLocaleDateString();
        console.log(matches.guestName);

        return (
          <div id="theMatches">
            <Card
              key={matches._id}
              className="card"
              textClassName="white-text"
              id="matchCardsAll"
              onClick={() => this.setState({ visible: true })}
            >
              <span className="card-title">
                {matches.guestName} from {matches.zipCode}
              </span>
              <p>{matches.descOfConcern}</p>
              <p>
                Dated: {new Date(matches.dateRecorded).toLocaleDateString()}
              </p>
              <p>By: {matches.clerkId}</p>
              <div className="card-action">
                  <a>Recovery: {matches.descOfRecovery}</a>
                  <a>Dated: {matches.recoveryCheck}</a>
                </div>
                <div className="centeringDiv">
                  <a
                    to="/concerns"
                    onClick={this.handleClick}
                    className=" btn btn-cancel red-text"
                  >
                    clear
                </a>
                </div>
            </Card>
          </div>
        );
      });
    }
  }

  render() {
    console.log(this.props);

    return <div id="matchList">{this.renderMatches()}</div>;
  }
}

function mapStateToProps({ concerns }) {
  return { concerns };
}

export default connect(mapStateToProps, { fetchConcerns })(ConcernsMatch);


//  {!visible ? (
//                 <div className="card-action">
//                   <a>Recovery: {matches.descOfRecovery}</a>
//                   <a>Dated: {matches.recoveryCheck}</a>
//                 </div>
//               ) : null}
//               <div>
//                 {visible ? (
//                   <div>
//                   <div className="card-action">
//                     <a>Recovery: {matches.descOfRecovery}</a>
//                     <a>Dated: {matches.recoveryCheck}</a>
//                   </div>
//                   <div className="centeringDiv">
//                     <a
//                       to="/concerns"
//                       onClick={this.handleClick}
//                       className=" btn btn-cancel red-text"
//                     >
//                       clear
//                     </a>
//                   </div>
//                   </div>
//                 ) : null}
// /* AFTER VISIBLE ~~ LINE 109
// <div>
//   <br />
//   <div visible={this.state.visible} onClose={this.hide.bind(this)}>
//     <div>
//       <label className="recoveryTag">RECOVERY</label>
//       <input
//         type="text"
//         name="descOfRecovery"
//         placeholder="Please provide a description of the recovery."
//         className="recoveryInput"
//         id="recoveryDescPlaceholder"
//       />
//     </div>
//     <div>
//       <label className="recoveryTag">RECOVERY DATE</label>
//       <input placeholder={now} readOnly className="recoveryInput" />
//     </div>
//   </div>
//   <button
//     type="submit"
//     className="lighten-1 btn-flat white-text"
//     id="addConcernButton"
//   >
//     <h5>
//       NEXT<i className="material-icons">done</i>
//     </h5>
//   </button>
//   <br />
//   <br />
//   <div className="centeringDiv">
//     <a
//       to="/concerns"
//       onClick={this.handleClick}
//       className=" btn btn-cancel red-text"
//     >
//       CANCEL
//     </a>
//   </div>
// </div>; */
