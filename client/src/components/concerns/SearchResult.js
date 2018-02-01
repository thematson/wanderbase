import React, { Component } from "react";
import { Button, Card, Row, Col } from "react-materialize";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      descOfRecovery: "",
      recoveryCheck: new Date().toLocaleDateString(),
      recoveryUpdates: [],
      areMatches: true,
      modalIsOpen: false
    };
    this.handleRecovery = this.handleRecovery.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    console.log(this.props);
    console.log(this.state);

    const id = this.props.matches[0]._id;
    const guestName = this.props.matches[0].guestName;
    const zipCode = this.props.matches[0].zipCode;
    const descOfRecovery = this.state.descOfRecovery;
    const recoveryCheck = this.state.recoveryCheck;
    axios
      .post("/api/concerns_update", {
        params: {
          id,
          descOfRecovery,
          recoveryCheck
        }
      })
      .then(res => {
        console.log(res);

        this.setState({
          recoveryUpdates: res.data
        });
      });
    document.getElementById("searchDiv").innerHTML = "";
    document.getElementById("searchNameInput").value = "";
    document.getElementById("searchZipInput").value = "";
  }

  render() {
    console.log(this.props.matches);

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

      //   if (!match._id) {
      //   return (
      //     <div className="noMatches">
      //     <h1 style={{ color: 'black' }}>There are no matches</h1>
      //     </div>
      //   )
      // } else {
      return (
        <div id="searchDiv">
          <Card
            key={match._id}
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
                        onChange={this.handleRecovery}
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

                    <button type="submit" onClick={this.openModal}>
                      SUBMIT
                    </button>
                  </form>
                  <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <h4 ref={subtitle => (this.subtitle = subtitle)}>Update Successful!</h4>
                    <div>The recovery for {match.guestName} has been recorded.</div>
                    <br/>
                    <button onClick={this.closeModal}>close</button>
                  </Modal>
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
