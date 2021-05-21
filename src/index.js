import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import EditDetails from "./components/EditDetails";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/editDetail/:id" component={EditDetails} />
      <Route path="/form" component={Form} />
      <Route path="/dashboard/:id" component={Dashboard} />
    </div>
  </Router>,
  document.getElementById("root")
);
