import React from "react";
import s from "./SortFilter.module.scss";
import { connect } from "react-redux";
import { setSortParams } from "../../../redux/filterProductReducer";
import { requestProductData } from "../../../redux/productReducer";

class SortFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort_filter_items: [
        {
          name: " цена по убыванию",
          type: "price:DESC",
          isActive: false,
        },
        {
          name: " цена по возрастанию",
          type: "price:ASC",
          isActive: false,
        },
        {
          name: " сначала новые",
          type: "createdAt:DESC",
          isActive: false,
        },
      ],
    };
  }
  changeSortItems = (filter_items) => {
    let items = this.state.sort_filter_items.map((item) => {
      if (filter_items === item.type) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
      return item;
    });
    this.setState({
      sort_filter_items: items,
    });
  };
  onChangeParams = (e) => {
    this.props.setSortParams(e.target.type);
    this.changeSortItems(e.target.type);
  };

  //lifecycle methods
  /* shouldComponentUpdate(nextProps) {
    return nextProps.sort_filter_params !== this.props.sort_filter_params;
  } */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.sort_filter_params !== this.props.sort_filter_params) {
      this.changeSortItems(this.props.sort_filter_params._sort);
    }
  }

  render() {
    return (
      <div className={s.sort_filter}>
        <div className={s.title}>Сортировать:</div>
        <ul>
          {this.state.sort_filter_items.map((item, index = 0) => {
            return (
              <li
                key={index++}
                className={`${item.isActive && s.active}`}
                onClick={this.onChangeParams}
                type={item.type}
              >
                <i className="fas fa-sort"></i>
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    sort_filter_params: state.filterProduct.sort_filter_params,
    checkbox_params: state.filterProduct.checkbox_params,
    price_params: state.filterProduct.price_params,
  };
};
export default connect(mapStateToProps, { setSortParams, requestProductData })(
  SortFilter
);
