// ConcernFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';


const ConcernFormReview = ({ onCancel, formValues, submitConcern, history }) => {

  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name} id="reviewDiv">
        <label className="reviewLabel">{label}</label>
        <div className="results">
          {formValues[name] || "N/A"}
        </div>
      </div>
    );
  });

  return (
    <div className="top" id="concernreview">
      <h5>Please confirm your entries</h5>
      {reviewFields}

      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitConcern(formValues, history)}
        className="green btn-flat right white-text"
      >
        Submit Concern
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.concernForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(ConcernFormReview));
