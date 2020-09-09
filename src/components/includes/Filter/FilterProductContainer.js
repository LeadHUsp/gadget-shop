import React, { Component } from "react";
import s from "./Filter.module.scss";
import {
  requestFilterItems,
  setPriceParams,
  setCheckBoxParams,
} from "../../../redux/filterProductReducer";
import { requestProductData } from "../../../redux/productReducer";
import FilterProduct from "./FilterProduct";
import { connect } from "react-redux";
import FilterPrice from "./FilterPrice";

class FilterProductContainer extends Component {
  componentDidMount() {
    this.props.requestFilterItems(this.props.slug);
  }

  onChangeParams = (e) => {
    /*  console.log(this.props.filter_params); */
    let params = this.props.checkbox_params.split("&");
    let param_name = e.target.name,
      param_value = e.target.value;
    if (e.target.checked === false && e.target.type === "checkbox") {
      let index = params.indexOf(`${param_name}=${param_value}`);
      if (index > -1) {
        params.splice(index, 1);
        params = params.join("&");
      }
    } else {
      params.push(`${param_name}=${param_value}`);
      params = params.join("&");
    }
    /*  console.log(params); */
    this.props.history.push(`/${this.props.slug}/`);
    this.props.setCheckBoxParams(params);
    /* this.props.requestProductData(
      this.props.slug,
      this.props.page,
      3,
      `${this.props.sort_params}${params}${this.props.price_params}`
    ); */
  };
  shouldComponentUpdate(nextProps) {
    return nextProps.filter_items !== this.props.filter_items;
  }
  componentWillUnmount() {
    this.props.setCheckBoxParams("");
  }

  render() {
    return (
      <div className={s.filter_container}>
        <div className={s.filter_title}>
          <i className="fas fa-filter"></i>
          <span>Доступные фильтры</span>
        </div>
        <FilterPrice {...this.props} />
        {this.props.filter_items.map((item) => {
          return (
            <FilterProduct
              key={item.param}
              {...item}
              onChangeParams={this.onChangeParams}
            />
          );
        })}
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    filter_items: state.filterProduct.filter_items,
    checkbox_params: state.filterProduct.checkbox_params,
    price_params: state.filterProduct.price_params,
    sort_params: state.filterProduct.sort_params,
  };
};

export default connect(mapStateToProps, {
  requestFilterItems,
  requestProductData,
  setCheckBoxParams,
  setPriceParams,
})(FilterProductContainer);
