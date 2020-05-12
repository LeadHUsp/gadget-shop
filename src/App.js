import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavContainer from "./components/Navigation/NavContainer";
import HomePageContainer from "./components/HomePage/HomePageContainer";
import ProductContainer from "./components/Shop/Product/ProductContainer";
import SingleProductContainer from "./components/Shop/SingleProduct/SingleProductContainer";
import "./main.scss";
import ShopingCartContainer from "./components/ShopingCart/ShopingCartContainer";

class App extends Component {
  render() {
    return (
      <Router>
        <NavContainer />
        <Switch>
          <Route exact path="/" render={() => <HomePageContainer />} />
          <Route
            exact
            path="/shoping_cart"
            render={() => <ShopingCartContainer />}
          />
          <Route exact path="/:slug" render={() => <ProductContainer />} />
          <Route
            exact
            path="/:slug/page_:page"
            render={() => <ProductContainer />}
          />
          <Route
            exact
            path="/:slug/single_product/:id"
            render={() => <SingleProductContainer />}
          />
          <Route
            exact
            path="/:slug/page_:page/single_product/:id"
            render={() => <SingleProductContainer />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
