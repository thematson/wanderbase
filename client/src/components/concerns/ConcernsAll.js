import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchConcerns } from "../../actions";
import { Button, Card, Row, Col } from "react-materialize";
import DeleteBtn from "./DeleteBtn";
import axios from "axios";

class ConcernsAll extends Component {
  componentDidMount() {
    this.props.fetchConcerns();
  }

  deleteConcern = id => {
    axios
      .delete("/api/concerns/" + id)
      .then(res => this.renderConcerns())
      .catch(err => console.log(err));
  };

  renderConcerns() {
    return this.props.concerns.reverse().map(concern => {
      return (
        <Card
          className="card"
          textClassName="white-text"
          id="matchCards"
          key={concern._id}
        >
          <span className="card-title">
            {concern.guestName} dated{" "}
            {new Date(concern.dateRecorded).toLocaleDateString()}
            <DeleteBtn onClick={() => this.deleteConcern(concern._id)} />
          </span>

          <p>{concern.descOfConcern}</p>
          <p>From: {concern.zipCode}</p>
          <p>By: {concern.clerkId}</p>

          <div className="card-action">
            <a>Recovery: {concern.descOfRecovery}</a>
            <a>Dated: {concern.recoveryCheck}</a>
          </div>
        </Card>
      );
    });
  }

  render() {
    return <div className="top">{this.renderConcerns()}</div>;
  }
}

function mapStateToProps({ concerns }) {
  return { concerns };
}

export default connect(mapStateToProps, { fetchConcerns })(ConcernsAll);
