import React from "react";
import s from "./SortFilter.module.scss";
import { connect } from "react-redux";
import { setSortParams } from "../../../redux/filterProductReducer";
import { requestProductData } from "../../../redux/productReducer";

class SortFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter_items: [
        {
          name: " цена по убыванию",
          type: "&_sort=price:DESC",
          isActive: false
        },
        {
          name: " цена по возрастанию",
          type: "&_sort=price:ASC",
          isActive: false
        },
        {
          name: " сначала новые",
          type: "&_sort=createdAt:DESC",
          isActive: false
        }
      ]
    };
  }

  shouldComponentUpdate(nextState) {
    return nextState.filter_items !== this.state.filter_items;
  }

  onChangeParams = (e) => {
    let params = `${this.props.checkbox_params}${this.props.price_params}${e.target.type}`;
    this.props.setSortParams(e.target.type);
    this.props.requestProductData(
      this.props.match.params.slug,
      this.props.match.params.page,
      3,
      params
    );
    let items = this.state.filter_items.map((item) => {
      if (e.target.type === item.type) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
      return item;
    });
    this.setState({
      filter_items: items
    });
  };
  render() {
    return (
      <div className={s.sort_filter}>
        <div className="d-flex align-items-center">Сортировать:</div>
        <ul>
          {this.state.filter_items.map((item, index = 0) => {
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
    sort_params: state.filterProduct.sort_params,
    checkbox_params: state.filterProduct.checkbox_params,
    price_params: state.filterProduct.price_params
  };
};
export default connect(mapStateToProps, { setSortParams, requestProductData })(
  SortFilter
);
