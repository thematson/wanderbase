// import React from "react";
// import { Link } from "react-router-dom";
// import ReactFileReader from 'react-file-reader';


// const Dashboard = () => {
//   return (
//     <div className="top">
//       Dashboard
//       <div className="fixed-action-btn">
//         <Link to="/concerns/new" className="btn-floating btn-large red">
//           <i className="material-icons" style={{fontSize: '50px'}}>add_circle</i>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactFileReader from 'react-file-reader';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  handleFiles = files => {
    var reader = new FileReader();
    reader.onload = function(e) {
    // Use reader.result
    var csv = reader.result;
    var lines = csv.split("\n");
    var result = [];
    var headers=lines[0].split(",");
    for(var i=1;i<lines.length;i++){
      var obj = {};
      var currentline=lines[i].split(",");
      for(var j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
      }
      //return result; //JavaScript object
      // result= JSON.stringify(result); //JSON
      for (var i=0; i<result.length; i++){
        console.log(result[i].NAME);
      }
      // console.log(result);
  }
  reader.readAsText(files[0]);
}

  render() {
    return (
      <div className='top'>
      <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'} >
        <button className='btn'>Upload</button>
      </ReactFileReader>
      </div>
    );
  }
}
