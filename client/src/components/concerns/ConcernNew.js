//concern new

import React, { Component } from "react";
import { reduxForm } from "redux-form";
import ConcernForm from "./ConcernForm";
import ConcernFormReview from "./ConcernFormReview";

class ConcernNew extends Component {
  state = { showConcernReview: false };

  renderContent() {
    if (this.state.showConcernReview) {
      return (
        <ConcernFormReview
          onCancel={() => this.setState({ showConcernReview: false })}
        />
      );
    }
    return (
      <ConcernForm
        onConcernSubmit={() => this.setState({ showConcernReview: true })}
      />
    );
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "concernForm"
})(ConcernNew);
