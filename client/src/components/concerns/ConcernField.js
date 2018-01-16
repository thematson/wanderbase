//concern field to render a single label
//and text iinput each customized with props

import React from "react";

export default ({ input, label }) => {
  return (
    <div>
      <label>{ label }</label>
      <input {...input}/>
    </div>
  );
};