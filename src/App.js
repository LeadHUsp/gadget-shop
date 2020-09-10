import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavContainer from "./components/Navigation/NavContainer";
import HomePageContainer from "./components/HomePage/HomePageContainer";
import SingleProductContainer from "./components/Shop/SingleProduct/SingleProductContainer";
import "./main.scss";
import ShopingCartContainer from "./components/ShopingCart/ShopingCartContainer";
import { Circle } from "react-preloaders";
const ProductContainer = React.lazy(() =>
  import("./components/Shop/Product/ProductContainer")
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
          <Route exact path='/' render={() => <HomePageContainer />} />
          <Route exact path='/shoping_cart' render={() => <ShopingCartContainer />} />
          <Route
            exact
            path='/:slug'
            render={() => {
              return (
                <Suspense fallback={<Circle color='#f6731c' />}>
                  <ProductContainer />
                </Suspense>
              );
            }}
          />
          <Route exact path='/:slug/page_:page' render={() => <ProductContainer />} />
          <Route
            exact
            path='/:slug/single_product/:id'
            render={() => <SingleProductContainer />}
          />
          <Route
            exact
            path='/:slug/page_:page/single_product/:id'
            render={() => <SingleProductContainer />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
