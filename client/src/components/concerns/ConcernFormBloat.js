//concern form
import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { Link } from "react-router-dom";
// import validateEmails from "../../utils/validateEmails";

import ConcernField from "./ConcernField";

let ConcernForm = props => {
  const { recoveryCheckValue, pristine, submitting } = props;
  return (
    <form onSubmit>
      <div>
        <label>Guest Last Name</label>
        <div>
          <Field
            type="text"
            name="lastName"
            component="input"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <label>Guest First Name</label>
        <div>
          <Field
            type="text"
            name="firstName"
            component="input"
            placeholder="First Name"
          />
        </div>
      </div>
      <div>
        <label>Guest Zip Code</label>
        <div>
          <Field
            type="text"
            name="zipCode"
            component="input"
            placeholder="11111"
          />
        </div>
      </div>
      <div>
        <label>Description of Concern</label>
        <div>
          <Field type="text" name="descOfConcern" component="textarea" />
        </div>
      </div>
      <div>
        <label>User ID</label>
        <div>
          <Field
            type="text"
            name="userId"
            component="input"
            placeholder="abcd123"
          />
        </div>
      </div>
      <div>
        <label>Deliver Communication Email</label>
        <div>
          <Field
            type="email"
            name="sendEmail"
            component="input"
            placeholder="recoveryteam@company.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="filled-in-box">Recovery Completed? &nbsp; &nbsp;</label>{" "}
        <Field
          name="recoveryCheck"
          className="filled-in"
          id="filled-in-box"
          component="input"
          type="checkbox"
        />
        <div />
        <br />
      </div>
      {recoveryCheckValue && (
        <div>
          <label>Description of Recovery</label>
          <div>
            <Field type="text" name="descOfRecovery" component="textarea" />
          </div>
        </div>
      )}
      <div>
        <Link to="/surveys" className="red btn-flat white-text">
          Cancel
        </Link>
        <button
          type="submit"
          id="formSubmit"
          className="cornflowerblue btn-flat right white-text"
          disabled={pristine || submitting}
        >
          Next
          <i className="material-icons right">done</i>
        </button>
      </div>
    </form>
  );
};


ConcernForm = reduxForm({
  form: "concernForm" // a unique identifier for this form
})(ConcernForm);

// Decorate with connect to read form values
const selector = formValueSelector("concernForm"); // <-- same as form name
ConcernForm = connect(state => {
  const recoveryCheckValue = selector(state, "recoveryCheck");
  return {
    recoveryCheckValue
  };
})(ConcernForm);

export default ConcernForm;
