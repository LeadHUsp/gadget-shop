import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import _ from "lodash";
import s from "./Filter.module.scss";
import {
  requestFilterItems,
  setLowPriceParam,
  setHighPriceParam,
  setCheckBoxParams,
  initAddCheckedItems,
  deleteCheckedItem,
  clearAllCheckedItems,
  pushCheckedItem,
  setSortParams,

} from "../../../redux/filterProductReducer";
import { requestProductData } from "../../../redux/productReducer";
import FilterProduct from "./FilterProduct";
import FilterPrice from "./FilterPrice";

const queryString = require("query-string");

class FilterProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }


  filterItemsShow = () => {
    this.setState((prevState) => {
      return { isOpen: !prevState.isOpen };
    });
  };

  clearFilterParams = () => {
    this.props.setCheckBoxParams({});
    this.props.setLowPriceParam("");
    this.props.setHighPriceParam("");    
    this.props.setSortParams("");
    this.props.clearAllCheckedItems();
  };
  setFilterParamsOnInit = () => {
    let parsedUrl = queryString.parse(this.props.location.search.substr(1), {
      parseNumbers: true,
      arrayFormat: "separator",
      arrayFormatSeparator: "_",
    });
   
    if (_.has(parsedUrl, "price_gt")) {
      this.props.setLowPriceParam(parsedUrl.price_gt);
      delete parsedUrl.price_gt;
    }
    if (_.has(parsedUrl, "price_lte")) {
      this.props.setHighPriceParam(parsedUrl.price_lte);
      delete parsedUrl.price_lte;
    }
    if (_.has(parsedUrl,"_sort")) {
 
      this.props.setSortParams(parsedUrl._sort);
      delete parsedUrl._sort
    }
    this.props.setCheckBoxParams(parsedUrl);
    this.props.requestFilterItems(this.props.match.params.slug);
  
  };

  pushFilterParamsToUrl = () => {
  
    let stringifyUrl = "";
    let checkboxParamsString = queryString.stringify(this.props.checkbox_params, {
      parseNumbers: true,
      arrayFormat: "separator",
      arrayFormatSeparator: "_",
    });
    if (checkboxParamsString !== "" ) {
      stringifyUrl = `${checkboxParamsString}`;
    }
   
    if (
      this.props.price_params.price_gt !== "" ||
      this.props.price_params.price_lte !== "" 
    ) {
      let priceParamsString = queryString.stringify(this.props.price_params, {
        parseNumbers: true,
        skipEmptyString: true,
      });
     
      stringifyUrl = `${stringifyUrl}&${priceParamsString}`;
    }
    if (this.props.sort_filter_params._sort !== "") {
      let sortParamString = queryString.stringify(this.props.sort_filter_params);
      stringifyUrl = `${stringifyUrl}&${sortParamString}`;
    }
 
   
    this.props.history.push({
      pathname: `/${this.props.match.params.slug}`,
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
     
    }
    if (e.target.checked === true && e.target.type === "checkbox") {
      /* console.log(typeof param_value); */
      this.props.pushCheckedItem({
        param_name: param_name,
        param_value: param_value,
      });
     
    }
    this.props.initAddCheckedItems();
  
  };

  //lifecycle methods
  componentDidMount() {
    this.props.requestFilterItems(this.props.match.params.slug);
    this.setFilterParamsOnInit();
    if (window.innerWidth < 576) {
      this.setState({ isOpen: false });
    }
  }
  componentDidUpdate(prevProps, prevState) {    
   
/*     console.log(this.props) */

    if (prevProps.checkbox_params !== this.props.checkbox_params || prevProps.sort_filter_params !== this.props.sort_filter_params ) {
     

      this.pushFilterParamsToUrl();
    }
    if (prevProps.match.params.slug !== this.props.match.params.slug) {
      this.props.requestFilterItems(this.props.match.params.slug);
    }
    if (prevProps.location.search !== this.props.location.search && this.props.location.search === "") {
      
      this.clearFilterParams();
      this.props.initAddCheckedItems();
 
    }
   
    
  }

  componentWillUnmount() {
    this.clearFilterParams();
  }

  render() {
    const list = {
      visible: { opacity: 1 },
      hidden: { opacity: 0 },
    };

    const itemAnimation = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.7,
        },
      },
      hidden: {
        opacity: 0,
        y: -100,
      },
    };
    const priceAnimation = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.5,
        },
      },
      hidden: {
        opacity: 0,
        y: -100,
      },
    };
    return (
      <AnimateSharedLayout>
        <motion.div layout className={s.filter_container}>
          <div className={s.filter_title} onClick={this.filterItemsShow}>
            <i className='fas fa-filter'></i>
            <span>Доступные фильтры</span>
          </div>
          <AnimatePresence>
            {this.state.isOpen && (
              <motion.div layout initial='hidden' animate='visible' variants={list}>
                <motion.div variants={priceAnimation}>
                  <FilterPrice
                    {...this.props}
                    concatSearchUrl={this.props.concatSearchUrl}
                    pushFilterParamsToUrl={this.pushFilterParamsToUrl}
                    clearFilterParams={this.clearFilterParams}
                  />
                </motion.div>
                {this.props.filter_items &&
                  this.props.filter_items.map((item) => {
                    return (
                      <motion.div
                        layout
                        exit={{ opacity: 0 }}
                        variants={itemAnimation}
                        key={item.param}>
                        <FilterProduct {...item} onChangeParams={this.onChangeParams} />
                      </motion.div>
                    );
                  })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimateSharedLayout>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    filter_items: state.filterProduct.filter_items,
    checkbox_params: state.filterProduct.checkbox_params,
    price_params: state.filterProduct.price_params,

    sort_filter_params: state.filterProduct.sort_filter_params,
  };
};

export default connect(mapStateToProps, {
  requestFilterItems,
  requestProductData,
  setCheckBoxParams,
  setLowPriceParam,
  setHighPriceParam,
  initAddCheckedItems,
  deleteCheckedItem,
  clearAllCheckedItems,
  pushCheckedItem,
  setSortParams,

})(withRouter(FilterProductContainer));
