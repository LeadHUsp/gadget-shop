import React, { Component } from "react";
import { requestProductData } from "../../../redux/productReducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Product from "./Product";
import Pagination from "../../includes/Pagination/Pagination";
import s from "./Product.module.scss";
import FilterProductContainer from "../../includes/Filter/FilterProductContainer";
import SortFilter from "../../includes/SortFilter/SortFilter";

class ProductContainer extends Component {
  componentDidMount() {
    /* console.log(this.props); */
    this.props.requestProductData(
      this.props.match.params.slug,
      this.props.match.params.page
    );
  }

  componentDidUpdate(prevProps) {
    console.log(this.props);
    if (
      prevProps.match.params.page !== this.props.match.params.page ||
      prevProps.checkbox_params !== this.props.checkbox_params
    ) {
      this.props.requestProductData(
        this.props.match.params.slug,
        this.props.match.params.page,
        3,
        `${this.props.sort_params}${this.props.checkbox_params}${this.props.price_params}`
      );
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <FilterProductContainer
              slug={this.props.match.params.slug}
              page={this.props.match.params.page}
              history={this.props.history}
            />
          </div>
          <div className={`col-9 ${s.catalog}`}>
            <SortFilter {...this.props} />
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
    totalPages: state.products.totalPages,
    isLoading: state.products.isLoading,
    sort_params: state.filterProduct.sort_params,
    checkbox_params: state.filterProduct.checkbox_params,
    price_params: state.filterProduct.price_params
  };
};
export default withRouter(
  connect(mapStateToProps, { requestProductData })(ProductContainer)
);
