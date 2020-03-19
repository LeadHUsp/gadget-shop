import React, { Component } from "react";
import HomePage from "./HomePage";
import { connect } from "react-redux";
import {
  requestPromoItems,
  requestCategories,
  requestBlogItems
} from "../../redux/homeReducer";

class HomePageContainer extends Component {
  componentDidMount() {
    this.props.requestPromoItems();
    this.props.requestCategories();
    this.props.requestBlogItems();
  }
  render() {
    return <HomePage {...this.props} />;
  }
}
let mapStateToProps = (state) => {
  return {
    promo_items: state.home.promo_items,
    categories_items: state.home.categories_items,
    blog_items: state.home.blog_items
  };
};

export default connect(mapStateToProps, {
  requestPromoItems,
  requestCategories,
  requestBlogItems
})(HomePageContainer);
