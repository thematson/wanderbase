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
        <form onSubmit={this.props.handleSubmit(this.props.onConcernSubmit)}>

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

          <Link to="/concerns" className="red btn-flat white-text">
            Cancel
          </Link>
          <button
            type="submit"
            className="green lighten-1 btn-flat right white-text"
          >
            Next
            <i className="material-icons right">done</i>
          </button>
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
