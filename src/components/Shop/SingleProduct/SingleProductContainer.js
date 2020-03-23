import React, { Component } from "react";
import { connect } from "react-redux";

class SingleProductContainer extends Component {
  componentDidMount() {}
  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProductContainer);
