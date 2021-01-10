import React, { Component } from "react";
import { requestSingleProductData } from "../../../redux/productReducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SingleProduct from "./SingleProduct";
class SingleProductContainer extends Component {
  componentDidMount() {
    /* console.log(this.props); */
    this.props.requestSingleProductData(
      this.props.match.params.slug,
      this.props.match.params.id
    );
  }
  /* componentDidUpdate() {
    console.log(this.props);
  } */
  render() {
    return (
      <>
        <SingleProduct
          {...this.props.single_product_data}
          product_id={this.props.match.params.id}
          slug={this.props.match.params.slug}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    single_product_data: state.products.single_product_data,
  };
};

export default withRouter(
  connect(mapStateToProps, { requestSingleProductData })(SingleProductContainer)
);
