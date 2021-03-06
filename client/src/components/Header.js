import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderTitle() {
    switch (this.props.auth) {
      case null:
        return <span>wanderBase</span>;
      case false:
        return <span>wanderBase</span>;
      default:
        return <span>wanderBase</span>;
    }
  }
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/login">Login || Register</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout, {this.props.auth.userName}</a>
          </li>
        );
    }
  }

  render() {
    console.log(this.props.auth);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/concerns" : "/"}
            className="left brand-logo"
          >
            {this.renderTitle()}
          </Link>
          <ul className="right" style={{ padding: "0 30px 0 0" }}>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
