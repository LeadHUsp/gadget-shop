import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePageContainer from "./components/HomePage/HomePageContainer";
import ProductContainer from "./components/Shop/Product/ProductContainer";
import "./main.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <HomePageContainer />} />
          <Route path="/:slug/:page/:id" render={() => <ProductContainer />} />
          <Route path="/:slug/:page" render={() => <ProductContainer />} />
          <Route path="/:slug" render={() => <ProductContainer />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
