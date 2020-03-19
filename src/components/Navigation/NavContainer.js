import React, { Component } from "react";
import { requestLinks } from "../../redux/navReducer";
import { connect } from "react-redux";
import Nav from "./Nav";

class NavContainer extends Component {
  componentDidMount() {
    this.props.requestLinks();
  }

  render() {
    return (
      <>
        <Nav nav_links={this.props.nav_links} />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    nav_links: state.navigation.nav_links
  };
};

export default connect(mapStateToProps, { requestLinks })(NavContainer);
