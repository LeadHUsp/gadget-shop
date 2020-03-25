import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePageContainer from "./components/HomePage/HomePageContainer";
import ProductContainer from "./components/Shop/Product/ProductContainer";
import SingleProductContainer from "./components/Shop/SingleProduct/SingleProductContainer";
import "./main.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <HomePageContainer />} />
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
          {/*   <Route
            exact
            path="/single_product/:id"
            render={() => <SingleProductContainer />}
          /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
