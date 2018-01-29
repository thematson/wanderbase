// SurveyForm shows a form for a user to add input
import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { Link } from "react-router-dom";
import ConcernField from "./ConcernField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class ConcernForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name, type, placeholder }) => {
      return (
        <Field
          key={name}
          component={ConcernField}
          type={type}
          label={label}
          name={name}
          placeholder={placeholder}
        />
      );
    });
  }

  render() {
    return (
      <div className="top" id="concernForm">
        <form
          id="concernFormForm"
          onSubmit={this.props.handleSubmit(this.props.onConcernSubmit)}
        >
          {this.renderFields()}
          {/* <div>
            <label htmlFor="filled-in-box">
              Recovery Completed? &nbsp; &nbsp;
            </label>{" "}
            <Field
              name="recoveryCheck"
              className="filled-in"
              id="filled-in-box"
              component="input"
              type="checkbox"
            />
            <div />
            <br />
          </div> */}

          <button
            type="submit"
            className="lighten-1 btn-flat white-text"
            id="addConcernButton"
          >
            <h5>
              NEXT<i className="material-icons">done</i>
            </h5>
          </button>
          <br /><br/>
          <div className="centeringDiv">
            <Link to="/concerns" className="btn btn-cancel red-text">
              CANCEL
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const selector = formValueSelector("concernForm"); // <-- same as form name
ConcernForm = connect(state => {
  // can select values individually
  const recoveryCheckValue = selector(state, "recoveryCheck");

  return {
    recoveryCheckValue
  };
})(ConcernForm);

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  _.each(formFields, ({ name }) => {
    if (name !== "recoveryCheck" && name !== "descOfRecovery") {
      if (!values[name]) {
        errors[name] = "You must provide a value";
      }
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "concernForm",
  destroyOnUnmount: false
})(ConcernForm);
