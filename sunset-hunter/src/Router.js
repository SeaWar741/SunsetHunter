import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ScrollRestoration from 'react-scroll-restoration';

/* Home */
import Home from "./components/Home";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollRestoration/>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="*" component={NotFound} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;