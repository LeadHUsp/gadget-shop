import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavContainer from "./components/Navigation/NavContainer";
import HomePageContainer from "./components/HomePage/HomePageContainer";
import "./main.scss";
import { Circle } from "react-preloaders";
const ProductContainer = React.lazy(() =>
  import("./components/Catalog/Product/ProductContainer")
);
const SingleProductContainer = React.lazy(() =>
  import("./components/Catalog/SingleProduct/SingleProductContainer")
);
const ShopingCartContainer = React.lazy(() =>
  import("./components/ShopingCart/ShopingCartContainer")
);

class App extends Component {
  componentDidMount() {
    if (process.env.NODE_ENV === "production") {
      console.log(process.env.NODE_ENV);
    }
  }

  render() {
    return (
      <Router>
        <NavContainer />
        <Switch>
          <Route exact path="/" render={() => <HomePageContainer />} />
          <Route
            exact
            path="/shoping_cart"
            render={() => {
              return (
                <Suspense fallback={<Circle color="#f6731c" />}>
                  <ShopingCartContainer />
                </Suspense>
              );
            }}
          />
          <Route
            exact
            path="/:slug"
            render={() => {
              return (
                <Suspense fallback={<Circle color="#f6731c" />}>
                  <ProductContainer />
                </Suspense>
              );
            }}
          />
          <Route
            exact
            path="/:slug/page_:page"
            render={() => {
              return (
                <Suspense fallback={<Circle color="#f6731c" />}>
                  <ProductContainer />
                </Suspense>
              );
            }}
          />
          <Route
            exact
            path="/:slug/single_product/:id"
            render={() => {
              return (
                <Suspense fallback={<Circle color="#f6731c" />}>
                  <SingleProductContainer />
                </Suspense>
              );
            }}
          />
          <Route
            exact
            path="/:slug/page_:page/single_product/:id"
            render={() => {
              return (
                <Suspense fallback={<Circle color="#f6731c" />}>
                  <SingleProductContainer />
                </Suspense>
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
