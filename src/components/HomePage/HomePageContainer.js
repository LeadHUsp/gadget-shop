import React, { Component } from "react";
import HomePage from "./HomePage";
import { connect } from "react-redux";
import {
  requestPromoItems,
  requestCategories,
  requestBlogItems,
} from "../../redux/homeReducer";
import { setIsLoading } from "../../redux/preloaderReducer";

class HomePageContainer extends Component {
  componentDidMount() {
    this.props.requestPromoItems();
    this.props.requestCategories();
    this.props.requestBlogItems();
    this.props.setIsLoading();
  }
  render() {
    return <HomePage {...this.props} />;
  }
}
let mapStateToProps = (state) => {
  return {
    promo_items: state.home.promo_items,
    categories_items: state.home.categories_items,
    blog_items: state.home.blog_items,
    isLoading: state.preloader.isLoading,
  };
};

export default connect(mapStateToProps, {
  requestPromoItems,
  requestCategories,
  requestBlogItems,
  setIsLoading,
})(HomePageContainer);
