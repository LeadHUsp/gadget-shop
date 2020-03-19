import React from "react";

const Product = (props) => {
  return (
    <div className="row py-4">
      {props.products_data.map((item) => (
        <div className="col-4" key={item.id}>
          <div className="py-3">{item.title}</div>
          <div className="py-3">{item.price} </div>
          <div className="py-3">{item.description} </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
