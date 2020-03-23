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
          <Route
            exact
            path="/:slug/:page"
            render={() => <ProductContainer />}
          />
          {/*  <Route path="/:slug/:id" render={() => <SingleProductContainer />} /> */}

          <Route path="/:slug" render={() => <ProductContainer />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
