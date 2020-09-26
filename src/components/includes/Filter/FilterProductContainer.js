import React, { Component } from "react";
import s from "./Filter.module.scss";
import {
  requestFilterItems,
  setPriceParams,
  setCheckBoxParams,
  initAddCheckedItems,
  deleteCheckedItem,
  pushCheckedItem,
} from "../../../redux/filterProductReducer";
import { requestProductData } from "../../../redux/productReducer";
import { withRouter } from "react-router-dom";
import FilterProduct from "./FilterProduct";
import { connect } from "react-redux";
import FilterPrice from "./FilterPrice";

const queryString = require("query-string");

class FilterProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }
  componentDidMount() {
    let parsedUrl = queryString.parse(this.props.location.search.substr(1), {
      parseNumbers: true,
      arrayFormat: "separator",
      arrayFormatSeparator: "_",
    });
    this.props.setCheckBoxParams(parsedUrl);
    this.props.requestFilterItems(this.props.slug);

    if (window.innerWidth < 576) {
      this.setState({ isOpen: false });
    }
  }
  filterItemsShow = () => {
    this.setState((prevState) => {
      return { isOpen: !prevState.isOpen };
    });
  };

  /* Логика => парсим строку урла =>  мапом проходимся по каждому элементу filter_item =>
  на каждом шаге мапа вызываем цикл for для checkbox => при совпадении item.param и имени свойства checkbox
  добавляем в item массив checked, где будут указаны выбранные параметры фильтра */
  pushCheckBoxParamsToUrl = () => {
    let stringifyUrl = queryString.stringify(this.props.checkbox_params, {
      parseNumbers: true,
      arrayFormat: "separator",
      arrayFormatSeparator: "_",
    });
    this.props.history.push({
      pathname: `/${this.props.slug}`,
      search: `${stringifyUrl}`,
    });
  };
  onChangeParams = (e) => {
    let param_name = e.target.name,
      param_value = e.target.value;
    /* console.log(e.target.getAttribute("typeofvalue") === "number"); */
    if (e.target.getAttribute("typeofvalue") === "number") {
      param_value = Number(param_value);
    }

    if (e.target.checked === false && e.target.type === "checkbox") {
      this.props.deleteCheckedItem({
        param_name: param_name,
        param_value: param_value,
      });
      this.props.initAddCheckedItems();
    }
    if (e.target.checked === true && e.target.type === "checkbox") {
      /* console.log(typeof param_value); */
      this.props.pushCheckedItem({
        param_name: param_name,
        param_value: param_value,
      });
      this.props.initAddCheckedItems();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    /* console.log(this.props.filter_items); */
    if (prevProps.checkbox_params !== this.props.checkbox_params) {
      /* this.onChangeParams(); */
      this.pushCheckBoxParamsToUrl();
    }
    if (prevProps.match.params.slug !== this.props.match.params.slug) {
      this.props.requestFilterItems(this.props.slug);
    }
  }

  componentWillUnmount() {
    this.props.setCheckBoxParams("");
  }

  render() {
    return (
      <div className={s.filter_container}>
        <div className={s.filter_title} onClick={this.filterItemsShow}>
          <i className='fas fa-filter'></i>
          <span>Доступные фильтры</span>
        </div>
        {this.state.isOpen && (
          <div>
            <FilterPrice {...this.props} />
            {this.props.filter_items &&
              this.props.filter_items.map((item) => {
                return (
                  <FilterProduct
                    key={item.param}
                    {...item}
                    onChangeParams={this.onChangeParams}
                  />
                );
              })}
          </div>
        )}
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
  initAddCheckedItems,
  deleteCheckedItem,
  pushCheckedItem,
})(withRouter(FilterProductContainer));
