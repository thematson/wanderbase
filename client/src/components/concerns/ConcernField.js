//concern field to render a single label
//and text iinput each customized with props

import React from "react";

export default ({ input, checkbox, label, placeholder, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input } style={{ marginBottom: "5px" }} placeholder ={placeholder} />

      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
