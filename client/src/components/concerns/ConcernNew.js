//concern new

import React, { Component } from "react";
import { connect } from "react-redux";
import ConcernForm from "./ConcernForm";

class ConcernNew extends Component {
  render() {
    return (
      <div>
        <ConcernForm />
      </div>
    );
  }
}

export default ConcernNew;
