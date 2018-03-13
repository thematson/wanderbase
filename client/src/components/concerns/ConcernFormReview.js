// ConcernFormReview shows users their form inputs for review
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

const ConcernFormReview = ({
  onCancel,
  formValues,
  submitConcern,
  history
}) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name} id="reviewDiv">
        <label className="reviewLabel">{label}</label>
        <div className="results">{formValues[name] || "N/A"}</div>
      </div>
    );
  });

  return (
    <div className="top" id="concernreview">
      <div id="reviewHeader">
        <span>Please confirm your entries</span>
      </div>
      {reviewFields}
      <br />
      <div id="submitConcernButton">
        <span onClick={() => submitConcern(formValues, history)}>
          Submit Concern<i className="material-icons">email</i>
        </span>
      </div>
      <br />

      <span className="cancelText" onClick={onCancel}>
        &#8647;Back
      </span>

    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.concernForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(ConcernFormReview));
