import React, { Component } from "react";
import { requestProductData } from "../../redux/productReducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Product from "./Product";
import Pagination from "../includes/Pagination";
import s from "./Product.module.scss";

class ProductContainer extends Component {
  componentDidMount() {
    this.props.requestProductData(
      this.props.match.params.slug,
      this.props.match.params.page
    );
  }

  componentDidUpdate(prevProps) {
    console.log(this.props);
    if (prevProps.match.params.page !== this.props.match.params.page) {
      this.props.requestProductData(
        this.props.match.params.slug,
        this.props.match.params.page
      );
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">FILTER WILL BE HERE</div>
          <div className={`col-9 ${s.catalog}`}>
            <Product {...this.props} />
            <Pagination
              slug={this.props.match.params.slug}
              totalPages={this.props.totalPages}
              currentPage={this.props.match.params.page}
            />
          </div>
        </div>
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    products_data: state.products.products_data,
    totalPages: state.products.totalPages
  };
};
export default withRouter(
  connect(mapStateToProps, { requestProductData })(ProductContainer)
);
