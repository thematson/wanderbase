import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  reduxForm,
  Field,
  formValueSelector,
  values,
  formValues,
  fieldInputPropTypes,
  Fields
} from "redux-form";
import { Link } from "react-router-dom";
import { fetchConcerns } from "../../actions";
import { searchConcerns } from "../../actions";
import ConcernField from "./ConcernField";
import formFields from "./formFields";
import Dashboard from "../Dashboard";
import index from "react-file-reader";
import { log } from "util";

class ConcernSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guestName: "",
      zipCode: ""
    };

    this.handleName = this.handleName.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleName(event) {
    this.setState({ guestName: event.target.value });
  }

  handleZip(event) {
    this.setState({ zipCode: event.target.value });
  }

  componentDidMount() {
    this.props.searchConcerns();
    console.log(this.props);

  }

  handleSubmit(event) {
    const guestName = this.state.guestName;
    console.log(guestName);

    searchConcerns(guestName);
    event.preventDefault();
    console.log(event);

  }

  render() {
    console.log(this);

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>First Name</label>
            <div>
              <input
                name="guestName"
                value={this.state.guestName}
                onChange={this.handleName}
                component="input"
                type="text"
                placeholder="LAST/FIRST"
              />
            </div>
          </div>
          <div>
            <label>Zip Code</label>
            <div>
              <input
                name="zipCode"
                value={this.state.zipCode}
                onChange={this.handleZip}
                component="input"
                type="text"
                placeholder="ZIP CODE"
              />
            </div>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

function  mapStateToProps({ matches }){
  return { matches };
}

export default connect(mapStateToProps, { searchConcerns })(ConcernSearch);

// const ConcernSearch = (props) => {
//    const { handleSubmit, pristine, reset, submitting } = props
//    this.state = { guestName: "",
//                       zipCode: ""}
//     console.log(this);

//   return (
//     <form onSubmit={console.log(values)}>
//       <div>
//         <label>First Name</label>
//         <div>
//           <Field name="guestName" value={this.state.guestName} component="input" type="text" placeholder="LAST/FIRST"/>
//         </div>
//       </div>
//       <div>
//         <label>Zip Code</label>
//         <div>
//           <Field name="zipCode" component="input" type="text" placeholder="ZIP CODE"/>
//         </div>
//       </div>
//       <div>
//         <button type="submit" disabled={pristine || submitting}>Submit</button>
//       </div>
//     </form>
//   )
// }

// export default reduxForm({
//   form: 'simple'
// })(ConcernSearch)
// class ConcernSearch extends Component {
//   // constructor(props) {
//   //   super(props);

//   //   this.state = {
//   //     searchConcerns: searchConcerns()
//   //   };
//   //   console.log(this.state);

//   // }
//   componentDidMount() {
//     this.props.searchConcerns();
//   }

//   renderFields() {
//     var searchFields = formFields.slice(0, 2);
//     return _.map(searchFields, ({ label, name, type, placeholder }) => {
//       return (
//         <Field
//           key={name}
//           component={ConcernField}
//           type={type}
//           label={label}
//           name={name}
//           placeholder={placeholder}
//         />
//       );
//     });
//   }

//   render() {
//     console.log(this.props);

//     return (
//       <div className="top" id="concernSearch">
//         <form onSubmit={""}>
//           {this.renderFields()}
//           {/* <div>
//             <label htmlFor="filled-in-box">
//               Recovery Completed? &nbsp; &nbsp;
//             </label>{" "}
//             <Field
//               name="recoveryCheck"
//               className="filled-in"
//               id="filled-in-box"
//               component="input"
//               type="checkbox"
//             />
//             <div />
//             <br />
//           </div> */}

//           <Link to="/concerns" className="red btn-flat white-text">
//             Cancel
//           </Link>
//           <button
//             type="submit"
//             className="green lighten-1 btn-flat right white-text"
//           >
//             Next
//             <i className="material-icons right">done</i>
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

// // const selector = formValueSelector("concernSearch"); // <-- same as form name
// // ConcernSearch = connect(state => {
// //   // can select values individually
// //   const recoveryCheckValue = selector(state, "recoveryCheck");

// //   return {
// //     recoveryCheckValue
// //   };
// // })(ConcernSearch);

// function validate(values) {
//   const errors = {};

//   _.each(formFields, ({ name }) => {
//     if (name !== "recoveryCheck" && name !== "descOfRecovery") {
//       if (!values[name]) {
//         errors[name] = "You must provide a value";
//       }
//     }
//   });

//   return errors;
// }

// export default reduxForm({
//   validate,
//   form: "concernSearch",
//   destroyOnUnmount: false
// })(ConcernSearch);
