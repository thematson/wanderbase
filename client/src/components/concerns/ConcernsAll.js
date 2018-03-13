import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchConcerns } from "../../actions";
import { Button, Card, Row, Col } from "react-materialize";
import DeleteBtn from "./DeleteBtn";
import { Link } from "react-router-dom";

import axios from "axios";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class ConcernsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleted: false,
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    this.props.fetchConcerns();
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  deleteConcern = id => {
    this.closeModal();
    console.log(id);

    const conArray = this.props.concerns;
    console.log(conArray);

    for (var i = 0; i < conArray.length; i++) {
      if (conArray[i]._id === id) {
        console.log("the match is " + conArray[i].guestName);
        conArray.splice(i, 1);
      }
    }
    console.log(this.props.concerns);
    this.forceUpdate();

    axios
      .delete("/api/concerns/" + id)
      .then(res => {
        this.renderConcerns();
      })
      .catch(err => console.log(err));
    console.log(this.state);

    this.state = { deleted: true };
    console.log(this.state);

    console.log(this);
    this.renderConcerns();
  };

  renderConcerns() {
    console.log(this.props.concerns);

    if (this.props.concerns.length === 0) {
      return (
        <div>
          <Link to="/concerns">
            <Card className="noResults" style={{ padding: 0, color: "black" }}>
              <span className="card-title" style={{ background: "white", padding: 0 }}>There are no results.</span>
              Click to Return to Dashboard.
            </Card>
          </Link>
        </div>
      );
    } else {
      return this.props.concerns.reverse().map(concern => {
        return (
          <div>
            <Card
              className="card"
              textClassName="white-text"
              id="matchCards"
              key={concern._id}
            >
              <span className="card-title">
                {concern.guestName} dated{" "}
                {new Date(concern.dateRecorded).toLocaleDateString()}
                <DeleteBtn onClick={this.openModal} />
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h5 ref={subtitle => (this.subtitle = subtitle)}>
                    Confirm Delete &nbsp;<i class="material-icons">
                      delete_forever
                    </i>
                  </h5>
                  <div>
                    <p>Do you really want to delete {concern.guestName} ?</p>
                  </div>

                  <div
                    className="confirmDelete"
                    onClick={() => this.deleteConcern(concern._id)}
                  >
                    <span>Yes, Delete</span>
                  </div>
                  <br />
                  <br />
                  <a
                    style={{ color: "red" }}
                    className="cancelText"
                    onClick={this.closeModal}
                  >
                    Cancel
                  </a>
                </Modal>
              </span>

              <p>{concern.descOfConcern}</p>
              <p>From: {concern.zipCode}</p>
              <p>By: {concern.clerkId}</p>

              <div className="card-action">
                <a>Recovery: {concern.descOfRecovery}</a>
                <a>Dated: {concern.recoveryCheck}</a>
              </div>
            </Card>
            <br />
          </div>
        );
      });
    }
  }

  render() {
    return <div className="top">{this.renderConcerns()}</div>;
  }
}

function mapStateToProps({ concerns }) {
  return { concerns };
}

export default connect(mapStateToProps, { fetchConcerns })(ConcernsAll);
