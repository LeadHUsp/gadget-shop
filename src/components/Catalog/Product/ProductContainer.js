import React, { Component } from "react";
import {
  requestProductData,
  setProductData,
} from "../../../redux/productReducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Product from "./Product";
import Pagination from "../../includes/Pagination/Pagination";
import s from "./Product.module.scss";
import FilterProductContainer from "../../includes/Filter/FilterProductContainer";
import SortFilter from "../../includes/SortFilter/SortFilter";
const queryString = require("query-string");

class ProductContainer extends Component {
  concatSearchUrl = () => {
    let checkboxparams = queryString.stringify(this.props.checkbox_params);
    let price_params = queryString.stringify(this.props.price_params, {
      parseNumbers: true,
      skipEmptyString: true,
    });
    let searchUrl = "";
    if (checkboxparams !== "") {
      searchUrl = `&${checkboxparams}`;
    }
    if (price_params !== "") {
      searchUrl = `${searchUrl}&${price_params}`;
    }
    if (this.props.sort_filter_params._sort !== "") {
      searchUrl = `${searchUrl}&_sort=${this.props.sort_filter_params._sort}`;
    }
    return searchUrl;
  };

  componentDidUpdate(prevProps) {
    let searchUrl = this.concatSearchUrl();
    if (
      prevProps.match.params.page !== this.props.match.params.page ||
      prevProps.match.params.slug !== this.props.match.params.slug
    ) {
      /* console.log(this.props); */
      this.props.requestProductData(
        this.props.match.params.slug,
        this.props.match.params.page || 1,
        4,
        searchUrl
      );
    }
    if (
      prevProps.checkbox_params !== this.props.checkbox_params ||
      prevProps.sort_filter_params !== this.props.sort_filter_params
    ) {
      this.props.requestProductData(
        this.props.match.params.slug,
        1,
        4,
        searchUrl
      );
    }

    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }
  componentWillUnmount() {
    this.props.setProductData([]);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className={`col-lg-3 col-sm-12 `}>
            <FilterProductContainer concatSearchUrl={this.concatSearchUrl} />
          </div>
          <div className={`col-lg-9 col-sm-12 ${s.catalog}`}>
            <SortFilter {...this.props} />
            <Product
              {...this.props}
              saveProductToCart={this.saveProductToCart}
            />
            <Pagination
              {...this.props}
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
    search_url: state.filterProduct.search_url,
    sort_filter_params: state.filterProduct.sort_filter_params,
    checkbox_params: state.filterProduct.checkbox_params,
    price_params: state.filterProduct.price_params,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    requestProductData,
    setProductData,
  })(ProductContainer)
);
