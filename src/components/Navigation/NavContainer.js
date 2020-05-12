import React, { Component } from "react";
import { requestLinks } from "../../redux/navReducer";
import { connect } from "react-redux";
import Nav from "./Nav";

class NavContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  menuToggle() {
    /*  this.setState((prevState) => {
      return {
        isOpen: !prevState.isOpen,
      };
    }); */
    this.setState({ isOpen: !this.state.isOpen });
    console.log(this.state);
  }
  componentDidMount() {
    this.props.requestLinks();
  }

  render() {
    return (
      <>
        <Nav
          products_in_cart={this.props.products_in_cart}
          isOpen={this.state.isOpen}
          nav_links={this.props.nav_links}
          menuToggle={this.menuToggle.bind(this)}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    nav_links: state.navigation.nav_links,
    products_in_cart: state.shopingCart.products_in_cart,
  };
};

export default connect(mapStateToProps, { requestLinks })(NavContainer);
